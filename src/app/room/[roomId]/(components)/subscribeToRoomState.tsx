"use client";

import { useEffect } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";
import { useUpdateMyJoinDate, useUpdateUsers } from "../../roomStore";
import { useRouter } from "next/navigation";

const SubscribeToRoomState = ({ roomId }: { roomId: string }) => {
   const updateUsers = useUpdateUsers();
   const updateMyJoinDate = useUpdateMyJoinDate();
   const router = useRouter();

   useEffect(() => {
      const channelName = `room-${roomId}-state`;
      pusherClient.subscribe(channelName);

      function handleRoomTerminate() {
         updateUsers([]);
         updateMyJoinDate("");
         router.push("/");
      }

      pusherClient.bind("room-terminate", handleRoomTerminate);

      return () => {
         pusherClient.unsubscribe(channelName);
         pusherClient.unbind("room-terminate", handleRoomTerminate);
      };
   }, [roomId, router, updateUsers, updateMyJoinDate]);
   return null;
};

export default SubscribeToRoomState;

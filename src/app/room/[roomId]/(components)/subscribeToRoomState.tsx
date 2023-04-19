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
      const stateChannel = pusherClient.subscribe(channelName);

      function handleRoomTerminate() {
         console.log("The room was terminated!");
         updateUsers([]);
         updateMyJoinDate("");
         router.push("/");
      }

      stateChannel.bind("room-terminate", handleRoomTerminate);

      return () => {
         pusherClient.unsubscribe(channelName);
         stateChannel.unbind("room-terminate", handleRoomTerminate);
      };
   }, [roomId, router, updateUsers, updateMyJoinDate]);
   return null;
};

export default SubscribeToRoomState;

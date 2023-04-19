"use client";

import { useEffect } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";
import { useMe, useUpdateUsers } from "../../roomStore";
import type { User } from "src/types";

const SubscribeToRoomUsers = ({ roomId }: { roomId: string }) => {
   const updateUsers = useUpdateUsers();
   const me = useMe();

   useEffect(() => {
      const channelName = `room-${roomId}-users`;
      const usersChannel = pusherClient.subscribe(channelName);

      async function fetchAndUpdateUsers() {
         const usersRes = await (
            await fetch("/api/room/users", {
               method: "POST",
               headers: { "content-type": "application/json" },
               body: JSON.stringify({ roomId }),
            })
         ).json();
         const newUsers = usersRes.users;
         updateUsers(newUsers);
      }

      function updateStateWhenRoomIsJoined(users: User[]) {
         console.log("update state when room is joined", users);
         updateUsers(users);
      }
      function updateStateWhenRoomIsLeft(users: User[]) {
         console.log("update state when room is left", users);
         updateUsers(users);
      }

      fetchAndUpdateUsers();
      usersChannel.bind("join-room", updateStateWhenRoomIsJoined);
      usersChannel.bind("leave-room", updateStateWhenRoomIsLeft);

      return () => {
         pusherClient.unsubscribe(channelName);
         usersChannel.unbind("join-room", updateStateWhenRoomIsJoined);
         usersChannel.unbind("leave-room", updateStateWhenRoomIsLeft);
      };
   }, [roomId, me, updateUsers]);
   return null;
};

export default SubscribeToRoomUsers;

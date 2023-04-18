"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";
import { useUser } from "../store";
import type { User } from "src/types";

function sortUsers(users: User[]) {
   users.sort((a, b) => (a.joinDate > b.joinDate ? 1 : -1));
}

const SubscribeToRoom = ({ roomId }: { roomId: string }) => {
   const [users, setUsers] = useState<User[]>([]);
   const user = useUser();

   useEffect(() => {
      const channelName = `room-${roomId}`;
      pusherClient.subscribe(channelName);

      async function updateUsers() {
         const usersRes = await (
            await fetch("/api/room/users", {
               method: "POST",
               headers: { "content-type": "application/json" },
               body: JSON.stringify({ roomId }),
            })
         ).json();
         const newUsers = usersRes.users;
         sortUsers(newUsers);
         setUsers(newUsers);
      }

      function updateStateWhenRoomIsJoined(users: User[]) {
         console.log("update state when room is joined", users);
         sortUsers(users);
         setUsers(users);
      }
      function updateStateWhenRoomIsLeft(users: User[]) {
         console.log("update state when room is left", users);
         sortUsers(users);
         setUsers(users);
      }

      updateUsers();
      pusherClient.bind("join-room", updateStateWhenRoomIsJoined);
      pusherClient.bind("leave-room", updateStateWhenRoomIsLeft);

      return () => {
         pusherClient.unsubscribe(channelName);
         pusherClient.unbind("join-room", updateStateWhenRoomIsJoined);
         pusherClient.unbind("leave-room", updateStateWhenRoomIsLeft);
      };
   }, [roomId, user]);

   return (
      <div className="p-5">
         {users.map((user, i) => (
            <div key={user.name + i}>{user.name}</div>
         ))}
      </div>
   );
};

export default SubscribeToRoom;

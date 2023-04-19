"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";
import { XMarkIcon } from "@heroicons/react/20/solid";

const RoomList = () => {
   const [rooms, setRooms] = useState<string[]>([]);
   useEffect(() => {
      const channel = "all-rooms";
      pusherClient.subscribe(channel);

      async function getAndSetAllRooms() {
         const roomsRes = await (await fetch("/api/room/all")).json();
         const rooms = roomsRes.rooms;
         setRooms(rooms);
      }
      getAndSetAllRooms();

      function handleTerminate(redisRoomId: string) {
         setRooms((prev) => prev.filter((room) => room !== redisRoomId));
      }

      function handleAdd(redisRoomId: string) {
         setRooms((prev) => prev.concat([redisRoomId]));
      }

      pusherClient.bind("room-terminate", handleTerminate);
      pusherClient.bind("room-add", handleAdd);

      return () => {
         pusherClient.unsubscribe(channel);
         pusherClient.unbind("room-terminate", handleTerminate);
         pusherClient.unbind("room-add", handleAdd);
      };
   }, []);

   async function handleTerminate(redisRoomId: string) {
      await fetch("/api/room/terminate", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({ roomId: redisRoomId.split("room-")[1] }),
      });
   }
   return (
      <div className="flex w-full flex-col gap-1">
         {rooms.map((room) => (
            <div
               key={room}
               className="flex w-full items-center justify-between rounded bg-white p-2"
            >
               <p>{room}</p>
               <div
                  onClick={() => handleTerminate(room)}
                  className="cursor-pointer rounded-full p-2 hover:bg-slate-200"
               >
                  <XMarkIcon className="h-5 w-5" />
               </div>
            </div>
         ))}
      </div>
   );
};

export default RoomList;

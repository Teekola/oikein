"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";
import { XMarkIcon } from "@heroicons/react/20/solid";

const RoomList = () => {
   const [rooms, setRooms] = useState<string[]>([]);
   useEffect(() => {
      const channel = "all-rooms";
      const allRoomsChannel = pusherClient.subscribe(channel);

      async function getAndSetAllRooms() {
         const roomsRes = await (await fetch("/api/room/all")).json();
         const newRooms = roomsRes.rooms;
         setRooms(newRooms);
      }
      getAndSetAllRooms();

      function handleRoomWasTerminated(redisRoomId: string) {
         console.log(`${redisRoomId} was terminated.`);
         setRooms((prev) => prev.filter((room) => room !== redisRoomId));
      }

      function handleRoomWasAdded(redisRoomId: string) {
         setRooms((prev) => prev.concat([redisRoomId]));
      }

      allRoomsChannel.bind("room-terminate", handleRoomWasTerminated);
      allRoomsChannel.bind("room-add", handleRoomWasAdded);

      return () => {
         pusherClient.unsubscribe(channel);
         allRoomsChannel.unbind("room-terminate", handleRoomWasTerminated);
         allRoomsChannel.unbind("room-add", handleRoomWasAdded);
      };
   }, []);

   async function handleTerminate(redisRoomId: string) {
      const roomId = redisRoomId.split("room-")[1];
      console.log("terminate", roomId);

      const terminateRes = await fetch("/api/room/terminate", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({ roomId }),
      });
      console.log("terminate status: ", terminateRes.status);
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

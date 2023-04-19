"use client";

import clsx from "clsx";
import Link from "next/link";
import type { ChangeEvent } from "react";
import { useState } from "react";

function RoomForm() {
   const [roomId, setRoomId] = useState("1");
   const [error, setError] = useState("");

   function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      setRoomId(e.target.value);
      if (e.target.value.length < 1) {
         setError("Huonekoodi ei ole validi.");
         return;
      }
      if (error) {
         setError("");
      }
   }
   return (
      <>
         <input
            value={roomId}
            onChange={handleInputChange}
            className="w-full rounded-md px-2 py-2 text-center text-xl outline outline-2 outline-slate-400 placeholder:text-center focus:outline-4 focus:outline-indigo-500"
            type="text"
            name="roomId"
            id="roomId"
            placeholder="Syötä huonekoodi..."
         />

         <Link
            href={`/room/${roomId}/join`}
            className={clsx(
               error && "pointer-events-none opacity-50",
               "flex w-full justify-center rounded-lg bg-indigo-500 px-5 py-4 text-xl font-bold text-slate-50 outline-none hover:bg-indigo-950 focus-visible:bg-indigo-950"
            )}
         >
            Liity
         </Link>
      </>
   );
}

export default RoomForm;

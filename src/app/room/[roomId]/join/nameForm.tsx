"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateUsername, useUser } from "../../store";
import type { User } from "src/types";

async function joinRoom(roomId: string, user: User) {
   if (!user) return;
   console.log("JOINING");
   await fetch("/api/room/join", {
      method: "POST",
      headers: {
         "content-type": "application/json",
      },
      body: JSON.stringify({
         roomId,
         user,
      }),
   });
}

function NameForm() {
   const { roomId } = useParams();
   const router = useRouter();
   const user = useUser();
   const [name, setName] = useState<string>(user.name);
   const updateUserName = useUpdateUsername();
   const [error, setError] = useState<string>("");

   async function handleClick() {
      const usersRes = await (
         await fetch("/api/room/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ roomId }),
         })
      ).json();

      const allUsers = usersRes.users as User[];

      if (allUsers.find((u) => u.name === name && u.id !== user.id)) {
         setError("Nimi on jo käytössä.");
         return;
      }
      updateUserName(name);
      await joinRoom(roomId, { name, id: user.id, joinDate: new Date() });
      setError("");
      router.push(`/room/${roomId}`);
   }
   return (
      <>
         <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md px-2 py-2 text-xl outline outline-2 outline-slate-400 focus:outline-4 focus:outline-indigo-500 dark:bg-slate-600 dark:text-slate-200 dark:outline-slate-500 dark:placeholder:text-slate-400 dark:focus:outline-indigo-400"
            type="text"
            name="roomId"
            id="roomId"
            placeholder="Syötä nimi..."
         />

         <button
            onClick={handleClick}
            className="flex w-full justify-center rounded-lg bg-indigo-500 px-5 py-4 text-xl font-bold text-slate-50 outline-none hover:bg-indigo-950 focus-visible:bg-indigo-950 dark:hover:bg-indigo-50 dark:hover:text-indigo-900 dark:focus-visible:bg-indigo-50 dark:focus-visible:text-indigo-900"
         >
            Liity
         </button>
         {error && <p className="text-red-500">{error}</p>}
      </>
   );
}

export default NameForm;

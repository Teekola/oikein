"use client";

import { useParams, useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { env } from "src/env/client.mjs";
import { useState } from "react";
import { useUpdatePusherClient } from "src/lib/pusher/pusherStore";

function NameForm() {
   const { roomId } = useParams();
   const router = useRouter();
   const [name, setName] = useState("");
   const updatePusherClient = useUpdatePusherClient();

   async function handleClick() {
      const newPusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
         cluster: "eu",
         channelAuthorization: {
            endpoint: "/pusher/auth",
            transport: "ajax",
            params: {
               name,
            },
         },
      });
      updatePusherClient(newPusherClient);
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
      </>
   );
}

export default NameForm;

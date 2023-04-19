"use client";

import { useRouter } from "next/navigation";
import { useMe, useUpdateMe } from "../../roomStore";

function LeaveRoomButton({ roomId }: { roomId: string }) {
   const router = useRouter();
   const me = useMe();
   const updateMe = useUpdateMe();

   async function leaveRoom() {
      await fetch("/api/room/leave", {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify({
            roomId,
            user: me,
         }),
      });
      updateMe({ ...me, joinDate: "" });
      router.push("/");
   }
   return (
      <button
         onClick={leaveRoom}
         className="flex w-full justify-center rounded-lg bg-indigo-500 px-5 py-4 text-xl font-bold text-slate-50 outline-none hover:bg-indigo-950 focus-visible:bg-indigo-950"
      >
         Leave Room
      </button>
   );
}

export default LeaveRoomButton;

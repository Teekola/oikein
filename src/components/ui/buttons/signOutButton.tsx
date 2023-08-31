"use client";

import clsx from "clsx";
import { signOut } from "next-auth/react";

export default function SignOutButton({ fullWidth }: { fullWidth?: boolean }) {
   return (
      <button
         type="button"
         className={clsx(
            "flex-grow-0 rounded bg-white p-3 text-slate-900 shadow-sm hover:bg-slate-50",
            fullWidth && "w-full",
            !fullWidth && "w-fit"
         )}
         onClick={() => signOut()}
      >
         Kirjaudu ulos
      </button>
   );
}

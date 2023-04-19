import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
   return (
      <>
         <div className="flex min-h-screen bg-slate-100">{children}</div>
      </>
   );
}

import type { PropsWithChildren } from "react";

export default function RoomLayout({
   children,
}: PropsWithChildren<{
   searchParams: { [key: string]: string | string[] | undefined };
}>) {
   return (
      <>
         <div className="flex min-h-screen bg-slate-100">{children}</div>
      </>
   );
}

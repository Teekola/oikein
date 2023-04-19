import type { PropsWithChildren } from "react";
import SubscribeToRoomUsers from "./(components)/subscribeToRoomUsers";
import SubscribeToRoomState from "./(components)/subscribeToRoomState";

export default function RoomLayout({
   params,
   children,
}: PropsWithChildren<{
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}>) {
   const { roomId } = params;
   return (
      <>
         <SubscribeToRoomUsers roomId={roomId} />
         <SubscribeToRoomState roomId={roomId} />
         <div className="flex min-h-screen bg-slate-100">{children}</div>
      </>
   );
}

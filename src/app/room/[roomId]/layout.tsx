import type { PropsWithChildren } from "react";
import SubscribeToRoom from "./subscribeToRoom";

export default function RoomLayout({
   params,
   children,
}: PropsWithChildren<{
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}>) {
   const { roomId } = params;
   return (
      <div>
         <h1>Huone {roomId}</h1>
         {children}
         <SubscribeToRoom roomId={roomId} />
      </div>
   );
}

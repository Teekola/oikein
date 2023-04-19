import RoomList from "./(components)/roomList";

export default function RoomPage({
   params,
}: {
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const { roomId } = params;

   return (
      <main className="mx-auto my-auto flex h-full w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10">
         <h1 className="text-6xl font-bold">Hallintapaneeli {roomId}</h1>
         <RoomList />
      </main>
   );
}

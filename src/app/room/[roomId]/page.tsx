import Users from "./users";

export default function RoomPage({
   params,
}: {
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const { roomId } = params;

   return (
      <div className="dark">
         <main className="flex w-full bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <div className="mx-auto my-auto flex h-full w-full max-w-max flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10 dark:bg-slate-800">
               <h1 className="w-full text-6xl font-bold">Huone {roomId}</h1>
               <Users />
            </div>
         </main>
      </div>
   );
}

import NameForm from "./nameForm";

export default function JoinPage({
   params,
}: {
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const { roomId } = params;

   return (
      <div>
         <main className="flex min-h-screen w-full bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <div className="mx-auto my-auto flex h-full w-full max-w-max flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10 dark:bg-slate-800">
               <h3>Liitytään huoneeseen {roomId}</h3>
               <h1 className="w-full text-6xl font-bold">Mikä on nimesi?</h1>
               <NameForm />
            </div>
         </main>
      </div>
   );
}

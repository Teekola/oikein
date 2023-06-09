import NameForm from "./nameForm";

export default function JoinPage({
   params,
}: {
   params: { roomId: string };
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const { roomId } = params;

   return (
      <main className="mx-auto my-auto flex h-full w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10">
         <h3>Liitytään huoneeseen {roomId}</h3>
         <h1 className="text-6xl font-bold">Mikä on nimesi?</h1>
         <NameForm />
      </main>
   );
}

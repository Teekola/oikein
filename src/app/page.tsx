import RoomForm from "./roomForm";

export default function HomePage() {
   return (
      <div className="light">
         <main className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <div className="mx-auto my-auto flex h-full w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10 dark:bg-slate-800">
               <h1 className="text-6xl font-bold">Oikein</h1>
               <RoomForm />
            </div>
         </main>
      </div>
   );
}

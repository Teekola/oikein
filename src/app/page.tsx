import PusherTest from "./pusherTest";

export default function HomePage() {
   return (
      <div className="light">
         <main className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <div className="mx-auto my-auto flex h-full w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-slate-200 p-10 dark:bg-slate-800">
               <h1 className="text-6xl font-bold">Oikein</h1>

               <input
                  className="w-full rounded-md px-2 py-2 text-xl outline outline-2 outline-slate-400 focus:outline-4 focus:outline-indigo-500 dark:bg-slate-600 dark:text-slate-200 dark:outline-slate-500 dark:placeholder:text-slate-400 dark:focus:outline-indigo-400"
                  type="text"
                  name="roomId"
                  id="roomId"
                  placeholder="Syötä huonekoodi..."
               />

               <button className="w-full rounded-lg bg-indigo-500 px-5 py-4 text-xl font-bold text-slate-50 outline-none hover:bg-indigo-950 focus-visible:bg-indigo-950 dark:hover:bg-indigo-50 dark:hover:text-indigo-900 dark:focus-visible:bg-indigo-50 dark:focus-visible:text-indigo-900">
                  Liity
               </button>
               <PusherTest />
            </div>
         </main>
      </div>
   );
}

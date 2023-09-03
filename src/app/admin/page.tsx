import SignOutButton from "@/ui/buttons/signOutButton";
import { ClockIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import { convertSearchParamsToURLSearchParams } from "src/lib/utils";

export default async function AdminPage({
   searchParams,
}: {
   searchParams: { [key: string]: string | string[] | undefined };
}) {
   const session = await getServerSession(authOptions);

   console.log(session);

   const queryString = convertSearchParamsToURLSearchParams(searchParams).toString();
   if (!session) redirect("/api/auth/signin?" + queryString);

   return (
      <div className="bg-slate-100">
         <div className="mx-auto flex max-w-screen-xl items-center justify-end gap-2 py-2">
            <SignOutButton />
            <div className="border-white-300 relative h-12 w-12 overflow-hidden rounded-full border-2 shadow-sm">
               <Image
                  src={session.user.image}
                  alt="Käyttäjän kuva"
                  fill
                  sizes="48px"
                  className="object-cover"
               />
            </div>
         </div>
         <main className="flex min-h-screen  text-slate-900">
            <div className="mx-auto flex h-full w-full max-w-screen-xl flex-1 flex-col gap-5 rounded-lg bg-slate-200 p-10">
               <h1>Hallintapaneeli</h1>
               <h2>Omat kyselyt</h2>
               <div className="flex flex-col gap-2">
                  <QuizItem
                     name="Hauskoja kysymyksiä"
                     questionAmount={5}
                     questionDuration={15}
                     answeringDuration={25}
                     scoreboardDuration={15}
                  />
                  <QuizItem
                     name="Heleppoo ja kivvaa"
                     questionAmount={10}
                     questionDuration={15}
                     answeringDuration={25}
                     scoreboardDuration={15}
                  />
               </div>
            </div>
         </main>
      </div>
   );
}

function QuizItem({
   name,
   questionAmount,
   questionDuration,
   answeringDuration,
   scoreboardDuration,
}: {
   name: string;
   questionAmount: number;
   questionDuration: number;
   answeringDuration: number;
   scoreboardDuration: number;
}) {
   const estimatedTime = Math.round(
      (questionAmount * (questionDuration + answeringDuration + scoreboardDuration)) / 60
   );
   return (
      <div className="group cursor-pointer rounded-lg bg-white p-2">
         <p className="text-lg font-bold group-hover:underline">{name}</p>
         <div className="flex gap-2">
            <p className="inline-flex items-center gap-1">
               <QuestionMarkCircleIcon className="h-5 w-5" /> {questionAmount}
            </p>
            <p className="inline-flex items-center gap-1">
               <ClockIcon className="h-5 w-5" /> {estimatedTime} min
            </p>
         </div>
      </div>
   );
}

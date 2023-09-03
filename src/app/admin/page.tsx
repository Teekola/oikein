import SignOutButton from "@/ui/buttons/signOutButton";
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
               <h1 className="text-6xl font-bold">Hallintapaneeli</h1>
            </div>
         </main>
      </div>
   );
}

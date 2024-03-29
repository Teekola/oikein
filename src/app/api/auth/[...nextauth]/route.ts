import { type Database, KyselyAdapter } from "@auth/kysely-adapter";
import { randomUUID } from "crypto";
import { type Kysely } from "kysely";
import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "src/env/server.mjs";
import { db } from "src/lib/kysely/db";

export const authOptions: AuthOptions = {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   adapter: KyselyAdapter(db as Kysely<Database>) as any,
   session: {
      strategy: "database",
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      updateAge: 24 * 60 * 60, // 24 hours
      generateSessionToken: () => randomUUID(),
   },
   providers: [
      GoogleProvider({
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   callbacks: {
      async session({ session, user, token }) {
         console.log({ session }, { user }, { token });
         return {
            ...session,
            user: {
               id: user.id,
               name: user.name,
               email: user.email,
               image: user.image,
            },
         };
      },
   },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

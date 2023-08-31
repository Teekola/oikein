import { KyselyAuth } from "@auth/kysely-adapter";
import { type GeneratedAlways, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "src/env/server.mjs";

interface Database {
   User: {
      id: GeneratedAlways<string>;
      name: string | null;
      email: string;
      emailVerified: Date | null;
      image: string | null;
   };
   Account: {
      id: GeneratedAlways<string>;
      userId: string;
      type: string;
      provider: string;
      providerAccountId: string;
      refresh_token: string | null;
      access_token: string | null;
      expires_at: number | null;
      token_type: string | null;
      scope: string | null;
      id_token: string | null;
      session_state: string | null;
   };
   Session: {
      id: GeneratedAlways<string>;
      userId: string;
      sessionToken: string;
      expires: Date;
   };
   VerificationToken: {
      identifier: string;
      token: string;
      expires: Date;
   };
}

export const db = new KyselyAuth<Database>({
   dialect: new PostgresDialect({
      pool: new Pool({
         host: env.POSTGRES_HOST,
         database: env.POSTGRES_DATABASE,
         user: env.POSTGRES_USER,
         password: env.POSTGRES_PASSWORD,
         ssl: { rejectUnauthorized: false },
      }),
   }),
});

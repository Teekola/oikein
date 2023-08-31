import { promises as fs } from "fs";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from "path";
import { Pool } from "pg";

import { type Database, db } from "./db";

async function migrateToLatest() {
   const { env } = await import("../../env/server.mjs");
   const migrator = new Migrator({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      db: new Kysely<Database>({
         dialect: new PostgresDialect({
            pool: new Pool({
               host: env.POSTGRES_HOST,
               database: env.POSTGRES_DATABASE,
               user: env.POSTGRES_USER,
               password: env.POSTGRES_PASSWORD,
               ssl: { rejectUnauthorized: false },
            }),
         }),
      }),
      provider: new FileMigrationProvider({
         fs,
         path,
         // This needs to be an absolute path.
         migrationFolder: path.join(__dirname, "src/lib/kysely/migrations"),
      }),
   });

   const { error, results } = await migrator.migrateToLatest();

   results?.forEach((it) => {
      if (it.status === "Success") {
         console.log(`migration "${it.migrationName}" was executed successfully`);
      } else if (it.status === "Error") {
         console.error(`failed to execute migration "${it.migrationName}"`);
      }
   });

   if (error) {
      console.error("failed to migrate");
      console.error(error);
      process.exit(1);
   }

   await db.destroy();
}

migrateToLatest();

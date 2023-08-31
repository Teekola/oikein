import { loadEnvConfig } from "@next/env";
import { promises as fs } from "fs";
import {
   CamelCasePlugin,
   FileMigrationProvider,
   Kysely,
   Migrator,
   PostgresDialect,
} from "kysely";
import * as path from "path";
import { Pool } from "pg";

import { type Database } from "./db";

loadEnvConfig(process.cwd());

async function migrateToLatest() {
   const db = new Kysely<Database>({
      dialect: new PostgresDialect({
         pool: new Pool({
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            ssl: { rejectUnauthorized: false },
         }),
      }),
      plugins: [new CamelCasePlugin()],
   });
   const migrator = new Migrator({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      db,
      provider: new FileMigrationProvider({
         fs,
         path,
         // This needs to be an absolute path.
         migrationFolder: path.join(__dirname, "/migrations"),
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

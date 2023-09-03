import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
   await db.schema.dropTable("account").ifExists().execute();
   await db.schema.dropTable("session").ifExists().execute();
   await db.schema.dropTable("user").ifExists().execute();
   await db.schema.dropTable("verificationToken").ifExists().execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
   await db.schema
      .createTable("user")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("name", "text")
      .addColumn("email", "text", (col) => col.unique().notNull())
      .addColumn("emailVerified", "timestamptz")
      .addColumn("image", "text")
      .execute();

   await db.schema
      .createTable("account")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("userId", "uuid", (col) =>
         col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("type", "text", (col) => col.notNull())
      .addColumn("provider", "text", (col) => col.notNull())
      .addColumn("providerAccountId", "text", (col) => col.notNull())
      .addColumn("refresh_token", "text")
      .addColumn("access_token", "text")
      .addColumn("expires_at", "bigint")
      .addColumn("token_type", "text")
      .addColumn("scope", "text")
      .addColumn("id_token", "text")
      .addColumn("session_state", "text")
      .execute();

   await db.schema
      .createTable("session")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("userId", "uuid", (col) =>
         col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("sessionToken", "text", (col) => col.notNull().unique())
      .addColumn("expires", "timestamptz", (col) => col.notNull())
      .execute();

   await db.schema
      .createTable("verification_token")
      .addColumn("identifier", "text", (col) => col.notNull())
      .addColumn("token", "text", (col) => col.notNull().unique())
      .addColumn("expires", "timestamptz", (col) => col.notNull())
      .execute();

   await db.schema
      .createIndex("Account_userId_index")
      .on("Account")
      .column("userId")
      .execute();

   await db.schema
      .createIndex("Session_userId_index")
      .on("Session")
      .column("userId")
      .execute();
}

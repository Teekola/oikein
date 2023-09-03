import type { Kysely } from "kysely";
import { sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
   await db.schema
      .createTable("Quiz")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("userId", "uuid", (col) =>
         col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("name", "text", (col) => col.notNull())
      .addColumn("description", "text")
      .addColumn("createdAt", "timestamptz", (col) => col.defaultTo(sql`now()`))
      .execute();

   await db.schema
      .createTable("QuizQuestion")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("quizId", "uuid", (col) =>
         col.references("Quiz.id").onDelete("cascade").notNull()
      )
      .addColumn("text", "text", (col) => col.notNull())
      .addColumn("number", "int2")
      .addUniqueConstraint("quizId_questionNumber_unique", ["quizId", "number"])
      .execute();

   await db.schema
      .createTable("QuestionOption")
      .addColumn("id", "uuid", (col) =>
         col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("questionId", "uuid", (col) =>
         col.references("QuizQuestion.id").onDelete("cascade").notNull()
      )
      .addColumn("text", "text", (col) => col.notNull())
      .addColumn("isCorrect", "boolean", (col) => col.notNull())
      .addColumn("number", "int2")
      .addUniqueConstraint("questionId_optionNumber_unique", ["questionId", "number"])
      .execute();

   await db.schema.createIndex("Quiz_userId_index").on("Quiz").column("userId").execute();

   await db.schema
      .createIndex("QuizQuestion_quizId_index")
      .on("QuizQuestion")
      .column("quizId")
      .execute();

   await db.schema
      .createIndex("QuestionOption_questionId_index")
      .on("QuestionOption")
      .column("questionId")
      .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
   await db.schema.dropTable("Quiz").ifExists().execute();
   await db.schema.dropTable("QuizQuestion").ifExists().execute();
   await db.schema.dropTable("QuestionOption").ifExists().execute();
}

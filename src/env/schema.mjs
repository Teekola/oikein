// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
   PUSHER_APP_ID: z.string().min(1),
   PUSHER_APP_SECRET: z.string().min(1),
   REDIS_DATABASE_URL: z.string().min(1),
   GOOGLE_CLIENT_ID: z.string(),
   GOOGLE_CLIENT_SECRET: z.string(),
   POSTGRES_URL: z.string(),
   POSTGRES_URL_NON_POOLING: z.string(),
   POSTGRES_USER: z.string(),
   POSTGRES_HOST: z.string(),
   POSTGRES_PASSWORD: z.string(),
   POSTGRES_DATABASE: z.string(),
   NODE_ENV: z.enum(["development", "preview", "production"]),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
   NEXT_PUBLIC_PUSHER_APP_KEY: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
   NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
};

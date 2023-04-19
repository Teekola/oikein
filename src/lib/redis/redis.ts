import { Redis } from "ioredis";
import { env } from "src/env/server.mjs";

export const redis = new Redis(env.REDIS_DATABASE_URL);

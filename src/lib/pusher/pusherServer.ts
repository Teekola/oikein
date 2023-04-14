import PusherServer from "pusher";
import { env } from "src/env/server.mjs";
import { env as clientEnv } from "src/env/client.mjs";

export const pusherServer = new PusherServer({
   appId: env.PUSHER_APP_ID,
   key: clientEnv.NEXT_PUBLIC_PUSHER_APP_KEY,
   secret: env.PUSHER_APP_SECRET,
   cluster: "eu",
   useTLS: true,
});

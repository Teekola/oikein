import Pusher from "pusher";
import { env } from "src/env/server.mjs";

export const pusherServer = new Pusher({
   appId: env.PUSHER_APP_ID,
   key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
   secret: env.PUSHER_APP_SECRET,
   cluster: "eu",
   useTLS: true,
});

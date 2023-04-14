import PusherClient from "pusher-js";
import { env as clientEnv } from "src/env/client.mjs";

export const pusherClient = new PusherClient(clientEnv.NEXT_PUBLIC_PUSHER_APP_KEY, {
   cluster: "eu",
});

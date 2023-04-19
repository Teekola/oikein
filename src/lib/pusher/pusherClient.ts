import Pusher from "pusher-js";
import { env as clientEnv } from "src/env/client.mjs";

const globalForPusherClient = global as unknown as {
   pusherClient: Pusher | undefined;
};

export const pusherClient =
   globalForPusherClient.pusherClient ??
   new Pusher(clientEnv.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: "eu",
   });

if (process.env.NODE_ENV !== "production") globalForPusherClient.pusherClient = pusherClient;

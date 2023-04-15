import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";

export async function GET() {
   const channel = "test-channel";
   const event = "test-event";
   const data = {
      message: "Hello world!",
   };
   console.log("trigger", {
      channel,
      event,
   });
   const res = await pusherServer.trigger(channel, event, data, {
      info: "subscription_count.user_count",
   });

   if (res.status === 200) {
      const body = await res.json();
      const channelInfo = body.channels;
      console.log(channelInfo);
   }

   return NextResponse.json({ status: "completed" });
}

import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";

export async function POST(req: Request) {
   console.log(await req.json());

   const channel = "test-channel";
   const event = "test-event";
   const data = {
      message: "Hello world!",
   };
   console.log("trigger", {
      channel,
      event,
   });
   const res = await pusherServer.trigger(channel, event, data);

   if (res.status === 200) {
      return NextResponse.json({ status: "completed" });
   }
   return NextResponse.json({ status: "failed" });
}

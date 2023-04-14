import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";

export async function GET(req: Request) {
   await pusherServer.trigger("test__123__test-event", "test-event", {
      value: "hello",
   });

   return NextResponse.json({ status: "completed" });
}

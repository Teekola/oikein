import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";

export async function POST(req: Request) {
   const body = await req.formData();

   const socketId = body.get("socket_id")?.toString() ?? "";
   const channel = body.get("channel_name")?.toString() ?? "";
   const presenceData = {
      user_id: Math.round(Math.random() * 10000000).toString(32),
      user_info: { name: "Mr Channels" },
   };
   const authResponse = pusherServer.authorizeChannel(socketId, channel, presenceData);
   return NextResponse.json(authResponse);
}

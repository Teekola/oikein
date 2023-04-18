import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";
import crypto from "crypto";
import type { UserInfo } from "pusher-js";

export async function POST(req: Request) {
   const body = await req.formData();

   const socketId = body.get("socket_id")?.toString();
   const channel = body.get("channel_name")?.toString();
   const name = body.get("name")?.toString();

   if (!socketId || !channel || !name) {
      return NextResponse.json(
         { error: "missing name" },
         {
            status: 400,
         }
      );
   }
   const id = crypto.randomUUID();
   const user_info: UserInfo = { id, name, joinDate: new Date() };
   const presenceData = {
      user_id: name,
      user_info,
   };

   // Fetch users on the channel
   const usersReq = await pusherServer.get({ path: `/channels/${channel}/users` });

   // Handle app disabled or message quota exceeded
   if (usersReq.status === 403) {
      return NextResponse.json({ error: "App disabled or over message quota." }, { status: 403 });
   }

   // In all other (known) error cases there is a body
   const usersRes = await usersReq.json();

   if (usersReq.status !== 200) {
      return NextResponse.json(usersRes, { status: usersReq.status });
   }

   const channelUsers = usersRes.users as { id: string }[];
   if (channelUsers.find((user) => user.id === name)) {
      return NextResponse.json({ error: "Nimi on varattu." }, { status: 400 });
   }

   const authResponse = pusherServer.authorizeChannel(socketId, channel, presenceData);
   return NextResponse.json(authResponse);
}

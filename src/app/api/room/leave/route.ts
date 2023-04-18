import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";
import * as z from "zod";
import { redis } from "src/lib/redis/redis";

const bodySchema = z.object({
   roomId: z.string().min(1),
   user: z.object({
      name: z.string().min(1),
   }),
});

type User = { name: string };

export async function POST(req: Request) {
   const body = await req.json();
   const parsedBody = bodySchema.safeParse(body);
   if (!parsedBody.success) return NextResponse.json({ success: false }, { status: 400 });
   const { roomId, user } = parsedBody.data;

   const channel = `room-${roomId}`;

   // Remove from redis for temporary persistence
   // users are stored as a set of stringified jsons
   await redis.srem(roomId, [JSON.stringify(user)]);

   // Get all the users if the set exists and empty string array if it does not exist
   const allUsersStr = await redis.smembers(roomId);
   const allUsers = allUsersStr.map((user) => JSON.parse(user)) as User[];

   // Update all clients
   console.log("trigger", "leave room");
   const pusherRes = await pusherServer.trigger(channel, "leave-room", allUsers);

   if (pusherRes.status !== 200) {
      const pusherResJson = await pusherRes.json();
      console.error(pusherResJson);
      return NextResponse.json({ success: false }, { status: pusherRes.status });
   }

   return NextResponse.json({ success: true }, { status: 200 });
}

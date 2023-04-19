import { NextResponse } from "next/server";
import * as z from "zod";
import { redis } from "src/lib/redis/redis";
import { pusherServer } from "src/lib/pusher/pusherServer";

const bodySchema = z.object({
   roomId: z.string().min(1),
});

export async function POST(req: Request) {
   const body = await req.json();
   const parsedBody = bodySchema.safeParse(body);
   if (!parsedBody.success) return NextResponse.json({ success: false }, { status: 400 });
   const { roomId } = parsedBody.data;

   const redisRoomId = `room-${roomId}`;

   // Remove the users set from redis
   await redis.del(redisRoomId);

   // Trigger terminate event
   pusherServer.trigger(`room-${roomId}-state`, "room-terminate", "");
   pusherServer.trigger("all-rooms", "room-terminate", redisRoomId);

   return NextResponse.json({ success: true }, { status: 200 });
}

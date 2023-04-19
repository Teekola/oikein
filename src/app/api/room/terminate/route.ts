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
   const pusherRes = await pusherServer.triggerBatch([
      {
         channel: `room-${roomId}-state`,
         name: "room-terminate",
         data: "",
      },
      {
         channel: "all-rooms",
         name: "room-terminate",
         data: redisRoomId,
      },
   ]);

   if (pusherRes.status !== 200) {
      const pusherResJson = await pusherRes.json();
      console.error(pusherResJson);
      return NextResponse.json({ success: false }, { status: pusherRes.status });
   }

   return NextResponse.json({ success: true }, { status: 200 });
}

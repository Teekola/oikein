import { NextResponse } from "next/server";
import { pusherServer } from "src/lib/pusher/pusherServer";
import * as z from "zod";
import { redis } from "src/lib/redis/redis";
import type { User } from "src/types";

const bodySchema = z.object({
   roomId: z.string().min(1),
   user: z.object({
      name: z.string().min(1),
      id: z.string().min(1),
      joinDate: z.string().datetime(),
   }),
});

export async function POST(req: Request) {
   const body = await req.json();
   const parsedBody = bodySchema.safeParse(body);

   if (!parsedBody.success) return NextResponse.json({ success: false }, { status: 400 });
   const { roomId, user } = parsedBody.data;

   const redisRoomId = `room-${roomId}`;

   // Get all the users if the set exists and empty string array if it does not exist
   const allUsersStr = await redis.smembers(redisRoomId);

   // Trigger room add to all-rooms channel when joining triggers
   // room creation
   if (allUsersStr.length === 0) {
      pusherServer.trigger("all-rooms", "room-add", redisRoomId);
   }
   const oldUsers = allUsersStr.map((user) => JSON.parse(user)) as User[];

   const oldUser = oldUsers.find((u) => u.id === user.id);
   let newUsers = [...oldUsers];
   if (!oldUser) {
      // Add the new user
      newUsers.push(user);
      await redis.sadd(redisRoomId, JSON.stringify(user));
   } else {
      // Update the user if needed (if name is updated)
      if (oldUser.name !== user.name) {
         newUsers = oldUsers.filter((u) => u.id !== user.id);
         newUsers.push(user);

         // Remove old user and add new user
         await redis
            .multi()
            .srem(redisRoomId, JSON.stringify(oldUser))
            .sadd(redisRoomId, JSON.stringify(user))
            .exec();
      }
   }

   // Update all clients
   console.log("trigger", "join room");
   const pusherRes = await pusherServer.trigger(
      `room-${roomId}-users`,
      "join-room",
      newUsers
   );

   if (pusherRes.status !== 200) {
      const pusherResJson = await pusherRes.json();
      console.error(pusherResJson);
      return NextResponse.json({ success: false }, { status: pusherRes.status });
   }

   return NextResponse.json({ success: true }, { status: 200 });
}

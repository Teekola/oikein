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
   }),
});

export async function POST(req: Request) {
   const body = await req.json();
   const parsedBody = bodySchema.safeParse(body);
   if (!parsedBody.success) return NextResponse.json({ success: false }, { status: 400 });
   const { roomId, user } = parsedBody.data;

   const channel = `room-${roomId}`;

   // Get all the users if the set exists and empty string array if it does not exist
   const allUsersStr = await redis.smembers(roomId);
   let allUsers = allUsersStr.map((user) => JSON.parse(user)) as User[];

   const finalUser = { ...user, joinDate: new Date() };

   const oldUser = allUsers.find((u) => u.id === user.id);
   if (!oldUser) {
      // Add the new user if the id is not already on the list
      allUsers.push(finalUser);
   } else {
      if (oldUser.name !== user.name) {
         // Update the username if needed
         allUsers = allUsers.filter((u) => u.id !== user.id);
         allUsers.push(finalUser);
         await redis.srem(roomId, JSON.stringify(oldUser));
      }
   }

   // Update all clients
   console.log("trigger", "join room");
   const pusherRes = await pusherServer.trigger(channel, "join-room", allUsers);

   if (pusherRes.status !== 200) {
      const pusherResJson = await pusherRes.json();
      console.error(pusherResJson);
      return NextResponse.json({ success: false }, { status: pusherRes.status });
   }

   // Add to redis for temporary persistence
   // users are stored as a set of stringified jsons
   await redis.sadd(roomId, JSON.stringify(finalUser));

   return NextResponse.json({ success: true }, { status: 200 });
}

import { NextResponse } from "next/server";
import * as z from "zod";
import { redis } from "src/lib/redis/redis";

const bodySchema = z.object({
   roomId: z.string().min(1),
});

type User = { name: string };

export async function POST(req: Request) {
   const body = await req.json();
   const parsedBody = bodySchema.safeParse(body);
   if (!parsedBody.success) return NextResponse.json({ success: false }, { status: 400 });
   const { roomId } = parsedBody.data;

   // Get all the users if the set exists and empty string array if it does not exist
   const allUsersStr = await redis.smembers(roomId);
   const allUsers = allUsersStr.map((user) => JSON.parse(user)) as User[];

   return NextResponse.json({ success: true, users: allUsers }, { status: 200 });
}

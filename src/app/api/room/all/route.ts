import { NextResponse } from "next/server";
import { redis } from "src/lib/redis/redis";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
   // Get all the users if the set exists and empty string array if it does not exist
   const allRooms = await redis.keys("room-*");

   return NextResponse.json({ success: true, rooms: allRooms }, { status: 200 });
}

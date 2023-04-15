"use client";

import { useEffect } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";

async function triggerMessage() {
   const routeRes = await fetch("/api/pusher", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
   });
   const resJson = await routeRes.json();
   console.log(resJson);
}

function PusherTest() {
   useEffect(() => {
      pusherClient.subscribe("test-channel");
      console.log("subscribed to", "testChannel");

      function testHandler(data: { message: string }) {
         console.log(data.message);
      }

      pusherClient.bind("test-event", testHandler);
      console.log("binded to", "test-event");

      return () => {
         pusherClient.unsubscribe("test-channel");
         pusherClient.unbind("test-event", testHandler);
         console.log("unsubscribed and unbinded");
      };
   }, []);
   return (
      <button
         onClick={triggerMessage}
         className="w-full rounded-lg bg-indigo-500 px-5 py-4 text-xl font-bold text-slate-50 outline-none hover:bg-indigo-950 focus-visible:bg-indigo-950 dark:hover:bg-indigo-50 dark:hover:text-indigo-900 dark:focus-visible:bg-indigo-50 dark:focus-visible:text-indigo-900"
      >
         Liity
      </button>
   );
}

export default PusherTest;

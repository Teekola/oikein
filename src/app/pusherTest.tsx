"use client";

import { useEffect } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";

function PusherTest() {
   useEffect(() => {
      pusherClient.subscribe("test__123__test-event");

      function testHandler() {
         console.log("message");
      }

      pusherClient.bind("test-event", testHandler);

      return () => {
         pusherClient.unsubscribe("test__123__test_event");
         pusherClient.unbind("test-event", testHandler);
      };
   }, []);
   return <div>PusherTest</div>;
}

export default PusherTest;

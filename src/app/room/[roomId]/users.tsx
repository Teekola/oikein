"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";

function Users() {
   const [members, setMembers] = useState<any>();
   const { roomId } = useParams();

   useEffect(() => {
      const presenceChannel = pusherClient.subscribe(`presence-room_${roomId}`);

      function memberAdded(members: any) {
         console.log(members);

         setMembers(members);
      }

      function memberRemoved(members: any) {
         setMembers(members);
      }

      presenceChannel.bind("pusher:subscription_succeeded", memberAdded);

      presenceChannel.bind("pusher:memberAdded", memberAdded);
      presenceChannel.bind("pusher:memberRemoved", memberRemoved);

      return () => {
         pusherClient.unsubscribe(`presence-room_${roomId}`);
         presenceChannel.unbind("pusher:memberAdded", memberAdded);
         presenceChannel.unbind("pusher:memberRemoved", memberRemoved);
         presenceChannel.unbind("pusher:subscription_succeeded", memberAdded);
      };
   }, [roomId]);
   return (
      <div>
         {members?.each((member: any) => (
            <div key={member.name}>{member.name}</div>
         ))}
      </div>
   );
}

export default Users;

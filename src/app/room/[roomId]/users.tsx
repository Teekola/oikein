"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { PusherMembers, Member, UserInfo, PresenceChannel } from "pusher-js";
import { usePusherClient } from "src/lib/pusher/pusherStore";

function sortMembers(members: UserInfo[]) {
   members.sort((a, b) => (a.joinDate > b.joinDate ? 1 : 0));
}

function Users() {
   const [members, setMembers] = useState<UserInfo[]>([]);
   const { roomId } = useParams();
   const router = useRouter();

   const pusherClient = usePusherClient();

   useEffect(() => {
      if (!pusherClient) {
         router.push(`/room/${roomId}/join`);
         return;
      }
      const presenceChannel = pusherClient.subscribe(`presence-room${roomId}`) as PresenceChannel;

      function subscribed(members: PusherMembers) {
         console.log("subscribed", members);
         const membersList = Object.values(members.members);
         sortMembers(membersList);
         setMembers(membersList);
      }

      function memberAdded(member: Member) {
         console.log("added", member);
         setMembers((prevMembers) => [...prevMembers, member.info]);
      }

      function memberRemoved(member: Member) {
         console.log("removed", member);
         const membersList = Object.values(presenceChannel.members.members) as UserInfo[];
         sortMembers(membersList);
         setMembers(membersList);
      }

      presenceChannel.bind("pusher:subscription_succeeded", subscribed);
      presenceChannel.bind("pusher:member_added", memberAdded);
      presenceChannel.bind("pusher:member_removed", memberRemoved);

      return () => {
         pusherClient.unsubscribe(`presence-room${roomId}`);
         presenceChannel.unbind("pusher:member_added", memberAdded);
         presenceChannel.unbind("pusher:member_removed", memberRemoved);
         presenceChannel.unbind("pusher:subscription_succeeded", subscribed);
      };
   }, [roomId, pusherClient, router]);
   return (
      <div>
         {members.map((member) => (
            <p key={member.id}>{member.name}</p>
         ))}
      </div>
   );
}

export default Users;

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pusherClient } from "src/lib/pusher/pusherClient";

function Users() {
   return null;
   /*
   const [users, setUsers] = useState<User[]>([]);
   const { roomId } = useParams();

   return (
      <div>
         {users.map((user) => (
            <p key={user.name}>{user.name}</p>
         ))}
      </div>
   );
   */
}

export default Users;

"use client";

import { useUsers } from "../../roomStore";

function UsersList() {
   const users = useUsers();

   return (
      <div>
         {users.map((user) => (
            <p key={user.name}>{user.name}</p>
         ))}
      </div>
   );
}

export default UsersList;

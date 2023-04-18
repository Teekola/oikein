// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Pusher, { Members } from "pusher-js";

declare module "pusher-js" {
   interface UserInfo {
      id: string;
      name: string;
      joinDate: Date;
   }

   interface Member {
      id: string;
      info: UserInfo;
   }

   class PusherMembers extends Members {
      members: {
         [memberId: string]: UserInfo;
      };
      count: number;
      myID: string;
      me: Member;
      constructor();
      get(id: string): Member;
      each(callback: (member: Member, id: string) => void): void;
   }
}

import type { User } from "src/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RoomStore {
   me: User;
   setMe: (me: User) => void;
   users: User[];
   updateUsers: (users: User[]) => void;
   updateMyName: (name: string) => void;
   updateMyJoinDate: (joinDate: string) => void;
}

const id =
   typeof window !== "undefined" && crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.round(Math.random() * 1000000).toString(36);

function sortUsers(users: User[]) {
   users.sort((a, b) => (a.joinDate > b.joinDate ? 1 : -1));
}

export const useRoomStore = create<RoomStore>()(
   persist(
      (set, get) => ({
         me: {
            name: "",
            id,
            joinDate: "",
         },
         setMe: (me) => set({ me }),
         updateMyName: (name) => set({ me: { ...get().me, name } }),
         updateMyJoinDate: (joinDate) => set({ me: { ...get().me, joinDate } }),
         users: [] as User[],
         updateUsers: (users) => {
            sortUsers(users);
            set({ users });
         },
      }),
      {
         name: "room-storage",
         storage: createJSONStorage(() => sessionStorage),
         // Select fields that should be persisted
         partialize: (state) => ({
            me: state.me,
         }),
      }
   )
);

export const useMe = () => useRoomStore((state) => state.me);
export const useUpdateMe = () => useRoomStore((state) => state.setMe);
export const useUpdateMyName = () => useRoomStore((state) => state.updateMyName);
export const useUpdateMyJoinDate = () => useRoomStore((state) => state.updateMyJoinDate);
export const useUsers = () => useRoomStore((state) => state.users);
export const useUpdateUsers = () => useRoomStore((state) => state.updateUsers);

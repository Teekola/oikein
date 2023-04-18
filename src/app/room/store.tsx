import type { User } from "src/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RoomStore {
   user: User;
   setUser: (user: User) => void;
   updateUserName: (name: string) => void;
}

export const useRoomStore = create<RoomStore>()(
   persist(
      (set, get) => ({
         user: {
            name: "",
            id:
               typeof window !== "undefined" && crypto && crypto.randomUUID
                  ? crypto.randomUUID()
                  : Math.round(Math.random() * 1000000).toString(36),
            joinDate: new Date(),
         },
         setUser: (user) => set({ user }),
         updateUserName: (name) => set({ user: { ...get().user, name } }),
      }),
      {
         name: "room-storage",
         storage: createJSONStorage(() => sessionStorage),
         // Select fields that should be persisted
         partialize: (state) => ({
            user: state.user,
         }),
      }
   )
);

export const useUser = () => useRoomStore((state) => state.user);
export const useSetUser = () => useRoomStore((state) => state.setUser);
export const useUpdateUsername = () => useRoomStore((state) => state.updateUserName);

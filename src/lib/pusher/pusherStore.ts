import type Pusher from "pusher-js";
import { create } from "zustand";

interface PusherStore {
   pusherClient: Pusher | null;
   updatePusherClient: (newClient: Pusher) => void;
}

const usePusherStore = create<PusherStore>()((set) => ({
   pusherClient: null,
   updatePusherClient: (newClient: Pusher) =>
      set((state) => {
         if (state.pusherClient) {
            state.pusherClient.disconnect();
         }
         return {
            ...state,
            pusherClient: newClient,
         };
      }),
}));

export const usePusherClient = () => usePusherStore((state) => state.pusherClient);
export const useUpdatePusherClient = () => usePusherStore((state) => state.updatePusherClient);

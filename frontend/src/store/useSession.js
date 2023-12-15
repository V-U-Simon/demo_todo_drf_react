import { create } from "zustand";
import { persist } from "zustand/middleware";

/* state and actions */
let useSession = (set, get) => ({
  session: {
    user: {},
  },
  setSession: (data) => set({ session: data }),
});

export function getStoredSession() {
  return useSession.getSession();
}

/* middleware */
useSession = persist(useSession, { name: "session-store" });

export default create(useSession);

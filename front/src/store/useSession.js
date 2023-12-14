import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiAuth } from "../api/apiAuth";

import { isExpired } from "react-jwt";

/* state and actions */
let useSession = (set, get) => ({
  session: {},
  login: async (email, password) => {
    const session = await apiAuth.login(email, password);
    set(() => ({ session: session }));
  },
  logout: () => set(() => ({ session: {} })),
  // isAuthenticated: (() => {
  //   const token = get()?.session?.access;
  //   if (!token) return false;

  //   return true;
  // })(),
});

/* middleware */
useSession = persist(useSession, { name: "session-store" });

export default create(useSession);

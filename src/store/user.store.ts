import { create } from "zustand";
import { TUser } from "../types";

interface UserState {
  user: TUser | null
  setUser: (user: TUser) => void
  logout: () => void
}


export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
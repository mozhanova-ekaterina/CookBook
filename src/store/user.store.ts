import { create } from "zustand";
import { TUser } from "../types";

interface UserState {
  user: TUser
  setUser: (user: TUser) => void
  clearUser: () => void
}


export const useUserStore = create<UserState>(set => ({
  user: {
    accountId: "",
    email: "",
    name: "",
    posts: [],
    liked: []
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { accountId: "", email: "", name: "", posts: [], liked: [] } }),
}))
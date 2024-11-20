import { create } from "zustand";
import { TUser } from "../types";

interface UserState {
  user: TUser;
  deleteUser: () => void;
  setUser: (user: TUser) => void;
}

const INITIAL_USER: TUser = {
  $id: "",
  accountId: "",
  email: "",
  name: "",
  posts: [],
  liked: [],
  imageUrl: "",
};

export const useUserStore = create<UserState>((set) => ({
  user: INITIAL_USER,
  setUser: (user) => {
    set({ user });
  },
  deleteUser: () => {
    set({ user: INITIAL_USER });
  },
}));

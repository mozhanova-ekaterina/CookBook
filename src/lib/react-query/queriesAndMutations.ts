import { useMutation } from "@tanstack/react-query";
import { TNewUser } from "../../types";
import { appwriteCreateAccount, appwriteCreateSession } from "../appwrite/api";

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (user: TNewUser) => appwriteCreateAccount(user),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (user: {email: string, password: string}) => appwriteCreateSession(user),
  })
};
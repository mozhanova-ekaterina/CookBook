import { createContext, useContext, useEffect, useState } from "react";
import { IContextType, TUser } from "../types";
import { appwriteGetCurrentUser } from "../lib/appwrite/api";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER: TUser = {
  id: "",
  accountId: "",
  name: "",
  email: "",
  imageUrl: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const { $id, accountId, name, email, imageUrl } =
        (await appwriteGetCurrentUser()) as Models.Document;
      if ($id) {
        setUser({
          id: $id,
          accountId,
          name,
          email,
          imageUrl,
        });

        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/login");

    checkAuthUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser: async () => false as boolean,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

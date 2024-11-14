import Header from "../components/shared/Header";
import { useState } from "react";
import { account } from "../lib/appwrite/config";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SignIn from "../components/shared/SignIn";
import SignUp from "../components/shared/SignUp";
import { useUserStore } from "../store/user.store";
import { TNewUser, TUser } from "../types";
import { appwriteCreateAccount, appwriteGetMe } from "../lib/appwrite/api";

const SignInUp = () => {
  const [tabs, setTabs] = useState<number>(1);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const register = async (user: TNewUser) => {
    const newUser = (await appwriteCreateAccount(user)) as TUser;
    if (!newUser) return;
    setUser(newUser);
    login(user.email, user.password);
  };
  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) return;
    const user = (await appwriteGetMe()) as TUser;
    setUser(user);
    navigate("/");
  };

  return (
    <>
      <div className="tabs tabs-bordered">
        <a
          onClick={() => setTabs(1)}
          className={clsx("tab", { "tab-active": tabs === 1 })}
        >
          Войти
        </a>
        <a
          onClick={() => setTabs(2)}
          className={clsx("tab", { "tab-active": tabs === 2 })}
        >
          Регистрация
        </a>
      </div>
      {tabs === 1 ? (
        <SignIn onSubmit={login} />
      ) : (
        <SignUp onSubmit={register} />
      )}
    </>
  );
};

export default SignInUp;

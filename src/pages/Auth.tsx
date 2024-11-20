import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SignIn from "../components/shared/SignIn";
import SignUp from "../components/shared/SignUp";
import { TNewUser, TUser } from "../types";
import { useToasterStore } from "../store/toaster.store";
import { useUserStore } from "../store/user.store";
import { appwriteCreateAccount, appwriteCreateSession, appwriteGetCurrentUser } from "../lib/appwrite/api";

const SignInUp = () => {
  const [tabs, setTabs] = useState<1 | 2>(1);
  const { setToast } = useToasterStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const signUp = async (user: TNewUser) => {
    const newUser = await appwriteCreateAccount(user);
    if (!newUser) {
      setToast("Не удалось создать аккаунт. Попробуйте снова", "error");
      return;
    }

    setToast("Вы успешно зарегистрировались", "success");
    signIn(user);
  };

  const signIn = async (user: { email: string; password: string }) => {
    const session = await appwriteCreateSession(user);
    if (!session) {
      setToast("Не удалось авторизоваться. Попробуйте снова", "error");
      return;
    }

    const currentUser = await appwriteGetCurrentUser() as TUser;
    if (!currentUser) {
      setToast("Не удалось войти", "error");
      return;
    }
    setUser(currentUser);
    setToast("Вы успешно вошли", "success");
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
      {tabs === 1 ? <SignIn onSubmit={signIn} /> : <SignUp onSubmit={signUp} />}
    </>
  );
};

export default SignInUp;

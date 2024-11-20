import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SignIn from "../components/shared/SignIn";
import SignUp from "../components/shared/SignUp";
import { useUserStore } from "../store/user.store";
import { TNewUser, TUser } from "../types";
import { appwriteCreateAccount, appwriteSignIn } from "../lib/appwrite/api";
import { useToasterStore } from "../store/toaster.store";

const SignInUp = () => {
  const [tabs, setTabs] = useState<number>(1);
  const { setUser } = useUserStore();
  const { setToast } = useToasterStore();
  const navigate = useNavigate();

  const signUp = async (user: TNewUser) => {
    const newUser = await appwriteCreateAccount(user);
    if (!newUser) {
      setToast('Не удалось создать аккаунт', 'error');
      return;
    }
    signIn(user);
    console.log("newUser", newUser);
  };
  const signIn = async (user: {email: string, password: string}) => {
    const currentUser = await appwriteSignIn(user)
    if(!currentUser) {
      setToast('Не удалось войти', 'error');
      return;
    }
    setUser(currentUser as TUser);
    setToast('Вы успешно вошли', 'success');
    navigate('/');
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
        <SignIn onSubmit={signIn} />
      ) : (
        <SignUp onSubmit={signUp} />
      )}
    </>
  );
};

export default SignInUp;

import Header from "../components/shared/Header";
import { useState } from "react";
import { account, ID } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SignIn from "../components/shared/SignIn";
import SignUp from "../components/shared/SignUp";
import { useUserStore } from "../store/user.store";

const SignInUp = () => {
  const [tabs, setTabs] = useState<number>(1);
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
    } catch (error) {
      window.alert(error);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      setUser({
        name: res.name,
        email: res.email,
      });
      navigate("/");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="page">
      <Header />
      <div className="container">
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
      </div>
    </div>
  );
};

export default SignInUp;

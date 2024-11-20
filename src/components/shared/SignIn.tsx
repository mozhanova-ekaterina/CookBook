import Input from "../ui/Input";
import { MdOutlineEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useToasterStore } from "../../store/toaster.store";

type Props = {
  onSubmit: (user: { email: string; password: string }) => void;
};

const SignIn: React.FC<Props> = ({ onSubmit }) => {
  const { setToast: setToast } = useToasterStore();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!user.email || !user.password) {
      setToast("Поля не могут быть пустыми", "error");
      return;
    }
    onSubmit(user);
  };
  return (
    <div className="grid gap-3 mt-4">
      <Input
        value={user.email}
        icon={<MdOutlineEmail size={"25px"} />}
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        validate={validateEmail}
      />

      <Input
        value={user.password}
        type="password"
        icon={<PiPassword size={"25px"} />}
        placeholder="Пароль"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        validate={validatePassword}
      />

      <button
        className="btn btn-primary w-[50%] justify-self-center"
        onClick={validateForm}
      >
        Войти
      </button>
    </div>
  );
};

export default SignIn;

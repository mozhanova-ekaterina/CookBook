import Input from "../ui/Input";
import { RiUserSmileLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/validation";
import { useToasterStore } from "../../store/toaster.store";
import { TNewUser } from "../../types";

type Props = {
  onSubmit: (user: TNewUser) => void;
};

const SignUp: React.FC<Props> = ({ onSubmit }) => {
  const {setToast: setToast} = useToasterStore();
  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [user, setUser] = useState<TNewUser>({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (user.password !== confirmPassword) {
      setToast("Пароли не совпадают", "error");
      
      return;
    }
    if (!user.name || !user.email || !user.password || !confirmPassword) {
      setToast("Поля не могут быть пустыми", "error");
      return;
    }
    onSubmit(user);
  };
  return (
    <div className="grid gap-3 mt-4">
      <Input
        value={user.name}
        icon={<RiUserSmileLine size={"25px"} />}
        placeholder="Имя пользователя"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        validate={validateName}
      />

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
      <Input
        value={confirmPassword}
        type="password"
        icon={<PiPassword size={"25px"} />}
        placeholder="Повторите пароль"
        onChange={(e) => setConfirmPassword(e.target.value)}
        validate={validatePassword}
      />
      <button
        className="btn btn-primary w-[50%] justify-self-center"
        onClick={validateForm}
      >
        Регистрация
      </button>
    </div>
  );
};

export default SignUp;

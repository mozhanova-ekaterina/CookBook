import Input from "../ui/Input";
import { MdOutlineEmail } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { useToasterStore } from "../../store/toaster.store";

type Props = {
  onSubmit: (email: string, password: string) => void;
};

const SignIn: React.FC<Props> = ({ onSubmit }) => {
  const { setToast: setToast } = useToasterStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateForm = () => {
    if ( !email || !password ) {
      setToast("Поля не могут быть пустыми", "error");
      return;
    }
    onSubmit(email, password,);
  };
  return (
    <div className="grid gap-3 mt-4">
      <Input
        value={email}
        icon={<MdOutlineEmail size={"25px"} />}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        validate={validateEmail}
      />

      <Input
        value={password}
        type="password"
        icon={<PiPassword size={"25px"} />}
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
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

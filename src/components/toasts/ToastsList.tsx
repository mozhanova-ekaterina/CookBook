import { useToasterStore } from "../../store/toaster.store";
import Toast from "./Toast";

const ToastsList = () => {
  const toasters = useToasterStore((state) => state.toasters);
  return (
    <div className="absolute right-0 bottom-0 p-4 grid gap-2">
      {toasters.map((t) => (
        <Toast key={t.id} text={t.message} type={t.type}/>
      ))}
    </div>
  );
};

export default ToastsList;

import clsx from "clsx";

type Props = {
  text?: string;
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  className?: string;
};

const Button: React.FC<Props> = ({
  endContent,
  startContent,
  text,
  className,
}) => {
  return (
    <button className={clsx(className, "btn btn-primary rounded-full p-2")}>
      {startContent}
      {text}
      {endContent}
    </button>
  );
};

export default Button;

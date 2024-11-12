import clsx from "clsx";
import React from "react";

type Props = {
  text?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  size?: number;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({
  text,
  icon,
  variant,
  className,
  onClick,
  size = 2,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `btn btn-${variant} h-[${size}rem]  min-h-[${size}rem] p-${size}`,
        className
      )}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;

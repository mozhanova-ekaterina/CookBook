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
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `btn btn-${variant}`,
        className
      )}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;

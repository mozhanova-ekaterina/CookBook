import clsx from "clsx";
import React from "react";

type Props = {
  text: string;
  className?: string;
};


const Title: React.FC<Props> = ({ text, className }) => {
  return <div className={clsx(className)}>{text}</div>;
};

export default Title;

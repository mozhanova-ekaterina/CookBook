import clsx from "clsx";
import React from "react";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { HiInformationCircle } from "react-icons/hi";

type Props = {
  text: string;
  type: "success" | "error" | "info";
};

const Toast: React.FC<Props> = ({ text, type }) => {
  return (
    <div
      className={clsx(
        "px-2 py-1 rounded-xl flex border-4 items-center gap-1 bg-base-100",
        {
          " alert-success": type === "success",
          " alert-error": type === "error",
          " alert-info": type === "info",
        }
      )}
    >
      {type === "success" && <FaHeartCircleCheck />}
      {type === "error" && <BiSolidMessageRoundedError />}
      {type === "info" && <HiInformationCircle />}
      <p>{text}</p>
    </div>
  );
};

export default Toast;

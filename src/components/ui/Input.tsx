import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  value: string;
  icon?: JSX.Element;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => { error: string };
  error?: string;
};

const Input: React.FC<Props> = ({
  value,
  icon,
  placeholder,
  type,
  onChange,
  validate = () => ({ error: "" }),
  error,
}) => {
  const [dirty, setDirty] = useState(false);
  const validation = validate(value);

  return (
    <div className="grid relative">
      <div className="absolute top-3">{icon}</div>
      <input
        onFocus={() => {
          setDirty(true);
        }}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className={clsx("gap-1 border-b-primary border-b py-2 outline-none", {
          "pl-7": icon,
        })}
      />
      {(validation?.error || error) && dirty && (
        <div className="text-warning mt-2 border p-1 rounded-md border-warning">
          <p>{validation?.error}</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;

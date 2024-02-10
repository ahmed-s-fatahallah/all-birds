import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import classes from "./InputField.module.css";

interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  variant: "login" | "register";
  type: "email" | "password" | "text";
  name: "email" | "first-name" | "last-name" | "password" | "confirm-password";
  errorMsg?: string;
}

export default function InputField({
  variant,
  type,
  children,
  name,
  errorMsg = "",
  ...rest
}: InputFieldProps) {
  return (
    <div className={classes["login-register"]}>
      <label htmlFor={`${variant}__${name}`}>
        {children} <span className={classes.error__msg}>{errorMsg}</span>
      </label>
      <input
        type={type}
        name={`${variant}__${name}`}
        id={`${variant}__${name}`}
        {...rest}
      />
    </div>
  );
}

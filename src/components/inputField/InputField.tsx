import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

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

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { variant, type, children, name, errorMsg = "", ...rest }: InputFieldProps,
    ref
  ) {
    return (
      <div className={classes["login-register"]}>
        <label htmlFor={`${variant}__${name}`}>
          {children} <span className={classes.error__msg}>{errorMsg}</span>
        </label>
        <input
          type={type}
          name={`${variant}__${name}`}
          id={`${variant}__${name}`}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
export default InputField;

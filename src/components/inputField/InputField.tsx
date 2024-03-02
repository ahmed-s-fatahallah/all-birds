import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useId,
} from "react";

import classes from "./InputField.module.css";

interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: "email" | "password" | "text" | "tel";
  name?: string;
  errorMsg?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { type, children, name, errorMsg = "", ...rest }: InputFieldProps,
    ref
  ) {
    const id = useId();

    return (
      <div className={classes["login-register"]}>
        <label htmlFor={id}>
          {children} <span className={classes.error__msg}>{errorMsg}</span>
        </label>
        <input type={type} id={id} name={name || id} ref={ref} {...rest} />
      </div>
    );
  }
);
export default InputField;

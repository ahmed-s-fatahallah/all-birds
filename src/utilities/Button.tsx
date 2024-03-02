import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import classes from "./Button.module.css";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: "filter-btn" | "add-to-cart-btn" | "submit-btn" | "";
}

export default function Button({
  variant,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={`${classes[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

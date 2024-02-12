"use client";
import InputField from "@/components/inputField/InputField";
import Button from "@/utilities/Button";
import Link from "next/link";

import classes from "./LoginRegisterSection.module.css";
import { useFormState } from "react-dom";
import { loginHandler, registerHandler } from "@/utilities/actions";
import { z } from "zod";

export default function LoginRegisterSection() {
  const initialState: z.typeToFlattenedError<
    {
      email: string;
      password: string | number;
      confirm_password: string | number;
      first_name?: string | undefined;
      last_name?: string | undefined;
    },
    string
  > = {
    fieldErrors: {
      email: undefined,
      password: undefined,
      confirm_password: undefined,
      first_name: undefined,
      last_name: undefined,
    },
    formErrors: [],
  };
  const [loginState, loginFormAction] = useFormState(
    loginHandler,
    initialState
  );
  const [registerState, registerFormAction] = useFormState(
    registerHandler,
    initialState
  );
  return (
    <section className={classes["login-register-section"]}>
      <div className={classes.container}>
        <form className="login" action={loginFormAction}>
          <h1 className={classes.login__title}>LOGIN</h1>
          <InputField
            name="email"
            variant="login"
            type="text"
            errorMsg={
              loginState?.fieldErrors?.email && loginState.fieldErrors?.email[0]
            }
          >
            email
          </InputField>

          <InputField
            name="password"
            variant="login"
            type="password"
            errorMsg={
              loginState?.fieldErrors?.password &&
              loginState.fieldErrors?.password[0]
            }
          >
            password
          </InputField>
          <Button
            variant="submit-btn"
            disabled={Boolean(!loginState?.fieldErrors)}
          >
            sign in
          </Button>
          <Link className={classes["forgot-password"]} href="#">
            forgot password
          </Link>
        </form>
        <form className="register" action={registerFormAction}>
          <h1 className={classes.register__title}>Create an account</h1>
          <p className={classes["security-text"]}>
            We never save credit card information.
          </p>
          <p className={classes["security-text"]}>
            Registering makes checkout fast and easy and saves your order
            information in your account.
          </p>
          <InputField
            name="first-name"
            variant="register"
            type="text"
            errorMsg={
              registerState?.fieldErrors?.first_name &&
              registerState.fieldErrors?.first_name[0]
            }
          >
            first name
          </InputField>
          <InputField
            name="last-name"
            variant="register"
            type="text"
            errorMsg={
              registerState?.fieldErrors?.last_name &&
              registerState.fieldErrors?.last_name[0]
            }
          >
            last name
          </InputField>

          <InputField
            name="email"
            variant="register"
            type="email"
            errorMsg={
              registerState?.fieldErrors?.email &&
              registerState.fieldErrors?.email[0]
            }
          >
            email*
          </InputField>
          <InputField
            name="password"
            variant="register"
            type="password"
            errorMsg={
              registerState?.fieldErrors?.password &&
              registerState.fieldErrors?.password[0]
            }
          >
            password*
          </InputField>
          <InputField
            name="confirm-password"
            variant="register"
            type="password"
            errorMsg={
              (registerState?.fieldErrors?.confirm_password &&
                registerState.fieldErrors?.confirm_password[0]) ||
              (registerState?.formErrors && registerState.formErrors[0])
            }
          >
            confirm password*
          </InputField>
          <Button
            variant="submit-btn"
            disabled={Boolean(
              !registerState?.fieldErrors && !registerState?.formErrors
            )}
          >
            register
          </Button>
          <p className={classes["register__terms-policy"]}>
            By creating an account, you agree to our{" "}
            <Link href="#">Terms of Use</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </p>
          <p className={classes.register__required}>* REQUIRED FIELDS</p>
        </form>
      </div>
    </section>
  );
}

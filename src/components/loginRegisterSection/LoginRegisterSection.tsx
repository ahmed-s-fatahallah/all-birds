"use client";
import { FormEvent, useRef, useState } from "react";
import InputField from "@/components/inputField/InputField";
import Button from "@/utilities/Button";
import Link from "next/link";
import { formSchema } from "@/utilities/ZodSchema";

import classes from "./LoginRegisterSection.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/utilities/firebaseConfig";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function LoginRegisterSection() {
  const router = useRouter();
  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);
  const registerFirstNameRef = useRef<HTMLInputElement>(null);
  const registerLastNameRef = useRef<HTMLInputElement>(null);
  const registerEmailRef = useRef<HTMLInputElement>(null);
  const registerPasswordRef = useRef<HTMLInputElement>(null);
  const registerConfirmPasswordRef = useRef<HTMLInputElement>(null);

  const [loginFormErrors, setLoginFormErrors] = useState<{
    email?: string[];
    password?: string[];
  } | null>(null);

  const [registerFormErrors, setRegisterFormErrors] = useState<{
    fieldErrors?: {
      first_name?: string[];
      last_name?: string[];
      email?: string[];
      password?: string[];
      confirm_password?: string[];
    };
    formErrors?: string[];
  } | null>(null);

  const [isFormLoading, setIsFormLoading] = useState(false);

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const loginFormSchema = formSchema.omit({
      first_name: true,
      last_name: true,
      confirm_password: true,
    });
    const parsedForm = loginFormSchema.safeParse({
      email: loginEmailRef.current?.value,
      password: loginPasswordRef.current?.value,
    });

    if (!parsedForm.success) {
      setLoginFormErrors(parsedForm.error.flatten().fieldErrors);
      return;
    }
    setLoginFormErrors(null);
    try {
      setIsFormLoading(true);
      await signInWithEmailAndPassword(
        auth,
        parsedForm.data.email,
        parsedForm.data.password
      );

      setIsFormLoading(false);
      router.back();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        console.log(error.message);
      }
      setLoginFormErrors({
        email: ["invalid Credentials"],
      });
      setIsFormLoading(false);
    }
  };

  const registerHandler = async (e: FormEvent) => {
    e.preventDefault();

    const refinedRegisterSchema = formSchema.refine(
      (data) => data.password === data.confirm_password,
      {
        message: "The password and confirm password fields must match",
      }
    );

    const parsedForm = refinedRegisterSchema.safeParse({
      first_name: registerFirstNameRef.current?.value,
      last_name: registerLastNameRef.current?.value,
      email: registerEmailRef.current?.value,
      password: registerPasswordRef.current?.value,
      confirm_password: registerConfirmPasswordRef.current?.value,
    });

    if (!parsedForm.success) {
      setRegisterFormErrors(parsedForm.error.flatten());

      return;
    }

    try {
      setIsFormLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        parsedForm.data.email,
        parsedForm.data.password
      );

      setIsFormLoading(false);
      router.back();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        console.log(error.message);
      }
      setRegisterFormErrors({
        fieldErrors: {
          first_name: ["An Error Occurred Please Try again Later"],
        },
      });
      setIsFormLoading(false);
    }
  };

  return (
    <section className={classes["login-register-section"]}>
      <div className={classes.container}>
        {/* Login Form */}
        <form className="login" onSubmit={loginSubmitHandler}>
          <h1 className={classes.login__title}>LOGIN</h1>
          <InputField
            ref={loginEmailRef}
            name="email"
            variant="login"
            type="text"
            errorMsg={loginFormErrors?.email && loginFormErrors.email[0]}
          >
            email
          </InputField>

          <InputField
            ref={loginPasswordRef}
            name="password"
            variant="login"
            type="password"
            errorMsg={loginFormErrors?.password && loginFormErrors.password[0]}
          >
            password
          </InputField>
          <Button variant="submit-btn" disabled={isFormLoading}>
            sign in
          </Button>
          <Link className={classes["forgot-password"]} href="#">
            forgot password
          </Link>
        </form>

        {/* Register Form */}
        <form className="register" onSubmit={registerHandler}>
          <h1 className={classes.register__title}>Create an account</h1>
          <p className={classes["security-text"]}>
            We never save credit card information.
          </p>
          <p className={classes["security-text"]}>
            Registering makes checkout fast and easy and saves your order
            information in your account.
          </p>
          <InputField
            ref={registerFirstNameRef}
            name="first-name"
            variant="register"
            type="text"
            errorMsg={
              registerFormErrors?.fieldErrors?.first_name &&
              registerFormErrors.fieldErrors.first_name[0]
            }
          >
            first name
          </InputField>
          <InputField
            ref={registerLastNameRef}
            name="last-name"
            variant="register"
            type="text"
            errorMsg={
              registerFormErrors?.fieldErrors?.last_name &&
              registerFormErrors.fieldErrors.last_name[0]
            }
          >
            last name
          </InputField>

          <InputField
            ref={registerEmailRef}
            name="email"
            variant="register"
            type="email"
            errorMsg={
              registerFormErrors?.fieldErrors?.email &&
              registerFormErrors.fieldErrors.email[0]
            }
          >
            email*
          </InputField>
          <InputField
            ref={registerPasswordRef}
            name="password"
            variant="register"
            type="password"
            errorMsg={
              registerFormErrors?.fieldErrors?.password &&
              registerFormErrors.fieldErrors.password[0]
            }
          >
            password*
          </InputField>
          <InputField
            ref={registerConfirmPasswordRef}
            name="confirm-password"
            variant="register"
            type="password"
            errorMsg={
              (registerFormErrors?.fieldErrors?.confirm_password &&
                registerFormErrors.fieldErrors.confirm_password[0]) ||
              (registerFormErrors?.formErrors &&
                registerFormErrors.formErrors[0])
            }
          >
            confirm password*
          </InputField>

          <Button variant="submit-btn" disabled={isFormLoading}>
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

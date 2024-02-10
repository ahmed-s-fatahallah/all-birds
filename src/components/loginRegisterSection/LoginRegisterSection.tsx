import InputField from "@/components/inputField/InputField";
import Button from "@/utilities/Button";
import Link from "next/link";

import classes from "./LoginRegisterSection.module.css";

export default function LoginRegisterSection() {
  return (
    <section className={classes["login-register-section"]}>
      <div className={classes.container}>
        <form className="login" action="">
          <h1 className={classes.login__title}>LOGIN</h1>
          <InputField name="email" variant="login" type="email">
            email
          </InputField>
          <InputField name="password" variant="login" type="password">
            password
          </InputField>
          <Button variant="submit-btn">sign in</Button>
          <Link className={classes["forgot-password"]} href="#">
            forgot password
          </Link>
        </form>
        <form className="register" action="">
          <h1 className={classes.register__title}>Create an account</h1>
          <p className={classes["security-text"]}>
            We never save credit card information.
          </p>
          <p className={classes["security-text"]}>
            Registering makes checkout fast and easy and saves your order
            information in your account.
          </p>
          <InputField name="first-name" variant="register" type="text">
            first name
          </InputField>
          <InputField name="last-name" variant="register" type="text">
            last name
          </InputField>

          <InputField name="email" variant="register" type="email">
            email
          </InputField>
          <InputField name="password" variant="register" type="password">
            password
          </InputField>
          <InputField
            name="confirm-password"
            variant="register"
            type="password"
          >
            confirm password
          </InputField>
          <Button variant="submit-btn">register</Button>
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

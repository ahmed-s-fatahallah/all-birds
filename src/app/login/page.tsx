import ProductApproach from "@/components/productApproach/ProductApproach";
import Button from "@/utilities/Button";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <section>
        <form className="login" action="">
          <h1 className="login__title">LOGIN</h1>
          <div className="login__email">
            <label htmlFor="login__email">Email</label>
            <input type="email" name="login__email" id="login__email" />
          </div>
          <div className="login__password">
            <label htmlFor="login__password">password</label>
            <input
              type="password"
              name="login__password"
              id="login__password"
            />
          </div>
          <Button variant="submit-btn">Login</Button>
          <Link href="#">forgot password</Link>
        </form>
        <form className="register" action="">
          <h1 className="register__title">Create an account</h1>
          <p>We never save credit card information.</p>
          <p>
            Registering makes checkout fast and easy and saves your order
            information in your account.
          </p>
          <div className="register__first-name">
            <label htmlFor="register__first-name">first name</label>
            <input
              type="text"
              name="register__first-name"
              id="register__first-name"
            />
          </div>
          <div className="register__last-name">
            <label htmlFor="register__last-name">last name</label>
            <input
              type="text"
              name="register__last-name"
              id="register__last-name"
            />
          </div>
          <div className="register__email">
            <label htmlFor="register__email">email*</label>
            <input type="text" name="register__email" id="register__email" />
          </div>
          <div className="register__password">
            <label htmlFor="register__password">password*</label>
            <input
              type="text"
              name="register__password"
              id="register__password"
            />
          </div>
          <div className="register__confirm-password">
            <label htmlFor="register__confirm-password">
              confirm password*
            </label>
            <input
              type="text"
              name="register__confirm-password"
              id="register__confirm-password"
            />
          </div>
          <Button variant="submit-btn">register</Button>
          <p className="register__terms-policy">
            By creating an account, you agree to our
            <Link href="#">Terms of Use</Link> and
            <Link href="#">Privacy Policy</Link>.
          </p>
          <p className="register__required">* REQUIRED FIELDS</p>
        </form>
      </section>
      <ProductApproach />
    </>
  );
}

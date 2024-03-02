import Button from "@/utilities/Button";
import Link from "next/link";

import classes from "./page.module.css";
import ProductApproach from "@/components/productApproach/ProductApproach";
import InputField from "@/components/inputField/InputField";

export default function Addresses() {
  return (
    <>
      <section className={classes["addresses-section"]}>
        <div className={classes["addresses-container"]}>
          <h1 className={classes["addresses-title"]}>my addresses</h1>
          <button className={classes["new-address-btn"]}>
            Add a new Address
          </button>
          <form className={classes["address-form"]}>
            <InputField type="text" name="first-name">
              First name
            </InputField>
            <InputField type="text" name="last-name">
              Last name
            </InputField>
            <InputField type="text" name="company">
              Company
            </InputField>
            <InputField type="text" name="address1">
              Address1
            </InputField>
            <InputField type="text" name="address2">
              Address2
            </InputField>
            <InputField type="text" name="city">
              City
            </InputField>
            <div className={classes["country-wrapper"]}>
              <label htmlFor="country">Country</label>
              <select name="country" id="country"></select>
            </div>
            <div className={classes["state-wrapper"]}>
              <label htmlFor="state">state</label>
              <select name="state" id="state"></select>
            </div>
            <InputField type="text" name="postal">
              Postal/Zip code
            </InputField>
            <InputField type="tel" name="phone">
              Phone
            </InputField>

            <div className={classes["default-wrapper"]}>
              <input type="checkbox" id="default" name="default" />
              <label htmlFor="default">SET AS DEFAULT ADDRESS</label>
            </div>
            <Button variant={"submit-btn"} className={classes["address-btn"]}>
              Add address
            </Button>
            <button className={classes["cancel-btn"]}>Cancel</button>
          </form>
          <div className={classes["addresses-wrapper"]}></div>
          <Link href="/account" className={classes["back-btn"]}>
            Back to account
          </Link>
        </div>
      </section>
      <ProductApproach />
    </>
  );
}

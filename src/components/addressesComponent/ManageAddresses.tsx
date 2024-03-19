"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import RenderAddresses from "./renderAddressesComponent/RenderAddresses";
import { CountryStateCity } from "@/definitions";
import AddressesForm from "./addressesForm/AddressesForm";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utilities/firebaseConfig";
import { useRouter } from "next/navigation";

import classes from "./ManageAddresses.module.css";
import formStyles from "./addressesForm/AddressesForm.module.css";

export default function ManageAddresses({
  countries,
}: {
  countries: CountryStateCity[];
}) {
  const formElRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.replace("/login");
      }
    });
  }, []);

  const addAddressClickHandler = () => {
    if (!formElRef.current) return;

    formElRef.current.classList.toggle(formStyles["show-form"]);
  };

  return (
    <>
      {user && (
        <section className={classes["addresses-section"]}>
          <div className={classes["addresses-container"]}>
            <h1 className={classes["addresses-title"]}>my addresses</h1>
            <button
              className={classes["new-address-btn"]}
              type="button"
              onClick={addAddressClickHandler}
            >
              Add a new Address
            </button>
            <AddressesForm countries={countries} ref={formElRef} />
            <div>
              <RenderAddresses countries={countries} />
            </div>
            <Link href="/account" className={classes["back-btn"]}>
              Back to account
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

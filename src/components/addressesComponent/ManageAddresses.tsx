"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import RenderAddressesList from "./renderAddressesComponent/RenderAddressesList";
import { CountryStateCity } from "@/definitions";
import AddressesForm from "./addressesForm/AddressesForm";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utilities/firebaseConfig";
import { useRouter } from "next/navigation";

import classes from "./ManageAddresses.module.css";
import formStyles from "./addressesForm/AddressesForm.module.css";
import { getCities, getStates } from "./getStatesCitiesActions";

export default function ManageAddresses({
  countries,
}: {
  countries: CountryStateCity[];
}) {
  const formElRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<CountryStateCity[]>();
  const [cities, setCities] = useState<CountryStateCity[]>();

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

  const addAddressClickHandler = async () => {
    if (!formElRef.current) return;

    formElRef.current.classList.toggle(formStyles["show-form"]);

    if (!formElRef.current.classList.contains(formStyles["show-form"])) return;
    try {
      setIsLoading(true);
      const initialStates = await getStates(countries[0].iso2);
      if (initialStates) {
        setStates(initialStates);
        const initialCities = await getCities(
          countries[0].iso2,
          initialStates[0].iso2
        );
        if (initialCities) setCities(initialCities);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      setIsLoading(false);
    }
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
            <AddressesForm
              countries={countries}
              ref={formElRef}
              statesList={states}
              citiesList={cities}
              loading={isLoading}
            />
            <div>
              <RenderAddressesList countries={countries} />
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

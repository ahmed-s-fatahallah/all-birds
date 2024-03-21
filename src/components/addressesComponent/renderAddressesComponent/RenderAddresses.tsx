"use client";

import { auth, database } from "@/utilities/firebaseConfig";
import { Unsubscribe, User } from "firebase/auth";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onValue, ref, set } from "firebase/database";
import AddressesForm from "../addressesForm/AddressesForm";
import { CountryStateCity } from "@/definitions";

import formStyles from "../addressesForm/AddressesForm.module.css";
import classes from "./RenderAddresses.module.css";

type AddressFormData = {
  "first-name": string;
  "last-name": string;
  "state-iso": string;
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  isDefault: boolean;
  phone: string;
  postal: string;
  state: string;
};

export default function RenderAddresses({
  countries,
}: {
  countries: CountryStateCity[];
}) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<AddressFormData[] | null>(null);
  const addressCardWrapperElRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.replace("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    const getAddresses = async () => {
      if (user) {
        try {
          const addressesPath = `users/${user.uid}/addresses`;
          unsubscribe = onValue(ref(database, addressesPath), (snapshot) => {
            setAddresses(snapshot.val());
          });
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          }
        }
      }
    };
    getAddresses();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const deleteAddressClickHandler = (index: number) => {
    if (!user) return;
    const addressesPath = `users/${user.uid}/addresses`;
    const deletedAddress = addresses?.splice(index, 1);
    if (
      deletedAddress &&
      deletedAddress[0].isDefault &&
      addresses &&
      addresses.length > 0
    ) {
      addresses[index - 1].isDefault = true;
    }
    set(ref(database, addressesPath), addresses || null);
  };
  const editAddressClickHandler = (index: number) => {
    if (!addressCardWrapperElRef.current) return;
    const formEls =
      addressCardWrapperElRef.current.querySelectorAll<HTMLFormElement>(
        `.${formStyles["address-form"]}`
      );
    formRef.current = formEls[index];
    formEls[index].classList.toggle(formStyles["show-form"]);
  };

  return (
    <div ref={addressCardWrapperElRef}>
      {addresses?.map((address, i) => {
        return (
          <Fragment key={`${address.address1}${i}`}>
            <div className={classes["address-card"]}>
              <h3>{`${address["first-name"]} ${address["last-name"]} ${
                address.isDefault ? "(default)" : ""
              }`}</h3>

              <div>
                <div>{address.company}</div>
                <div>{`${address.address1}, ${address.address2}`}</div>
                <div>{`${!address.city ? "" : address.city + ","} ${
                  !address["state-iso"] ? "" : address["state-iso"] + ","
                } ${address.postal}`}</div>
                <div>{`${address.country}`}</div>
                <div>{`${address.phone}`}</div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={editAddressClickHandler.bind(null, i)}
                >
                  edit
                </button>{" "}
                |{" "}
                <button
                  type="button"
                  onClick={deleteAddressClickHandler.bind(null, i)}
                >
                  delete
                </button>
              </div>
            </div>
            <AddressesForm
              countries={countries}
              currentFirstName={address["first-name"]}
              currentLastName={address["last-name"]}
              currentCompany={address.company}
              currentAddress1={address.address1}
              currentAddress2={address.address2}
              currentCity={address.city}
              currentState={address.state}
              currentPostal={address.postal}
              currentCountry={address.country}
              currentPhone={address.phone}
              currentIsDefault={address.isDefault}
              ref={formRef}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

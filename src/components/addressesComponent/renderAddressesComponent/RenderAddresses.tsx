"use client";

import { auth, database } from "@/utilities/firebaseConfig";
import { User } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onValue, ref, set } from "firebase/database";

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

export default function RenderAddresses() {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<AddressFormData[] | null>(null);
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
    const getAddresses = async () => {
      if (user) {
        try {
          const addressesPath = `users/${user.uid}/addresses`;
          onValue(ref(database, addressesPath), (snapshot) => {
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
  }, [user]);

  const deleteAddressClickHandler = (index: number) => {
    if (!user) return;
    const addressesPath = `users/${user.uid}/addresses`;
    addresses?.splice(index, 1);
    set(ref(database, addressesPath), addresses || null);
  };

  return (
    <>
      {addresses?.map((address, i) => {
        return (
          <div className={classes["address-card"]} key={address.address1}>
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
              <button type="button">edit</button> |{" "}
              <button
                type="button"
                onClick={deleteAddressClickHandler.bind(null, i)}
              >
                delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

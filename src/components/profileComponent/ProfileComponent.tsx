"use client";
import Link from "next/link";
import Button from "@/utilities/Button";
import { auth, databaseRef } from "@/utilities/firebaseConfig";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

import classes from "./ProfileComponent.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { DataSnapshot, child, get } from "firebase/database";
import { AddressFormData } from "@/definitions";

export default function ProfileComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<AddressFormData>();

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        router.replace("/login");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    try {
      const addressesPath = `users/${user.uid}/addresses`;

      get(child(databaseRef, addressesPath)).then((addresses: DataSnapshot) => {
        if (addresses.val().length === 0) return;

        const currentDefaultAddress = addresses
          .val()
          .find((address: AddressFormData) => address.isDefault);
        console.log(currentDefaultAddress);
        setDefaultAddress(currentDefaultAddress);
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }, [user]);

  return (
    <>
      {isAuthenticated && (
        <div className={classes["container"]}>
          <div className={classes["header-wrapper"]}>
            <h1 className={classes.title}>My Account</h1>
            <Button
              className={classes["header-btn"]}
              variant=""
              onClick={() => {
                signOut(auth);
                router.push("/");
              }}
            >
              Logout
            </Button>
          </div>
          <div className={classes["main-wrapper"]}>
            <p>You haven&apos;t placed any orders yet.</p>
            <div className={classes["details"]}>
              <div>
                <h3 className={classes.name}>
                  {auth.currentUser?.displayName || "No display name"}
                </h3>
                <div className={classes["details__address-info"]}>
                  <p>{auth?.currentUser?.email}</p>
                  <p>{defaultAddress?.company}</p>
                  <p>{defaultAddress?.address1}</p>
                  <p>{defaultAddress?.address2}</p>
                  <p>{`${
                    !defaultAddress?.city ? "" : defaultAddress?.city + ","
                  } ${
                    !defaultAddress?.["state-iso"]
                      ? ""
                      : defaultAddress?.["state-iso"] + ","
                  } ${defaultAddress?.postal}`}</p>
                  <p>{`${defaultAddress?.country}`}</p>
                  <p>{`${defaultAddress?.phone}`}</p>
                </div>
                {!defaultAddress && (
                  <p>YOU HAVEN&apos;T ADDED AN ADDRESS YET.</p>
                )}
              </div>
              <Link
                href={`${pathname}/addresses`}
                className={classes["address-link"]}
              >
                {defaultAddress ? "View Addresses" : "Add an Address"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import Button from "@/utilities/Button";
import { auth } from "@/utilities/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import classes from "./page.module.css";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  console.log(auth.currentUser);
  return (
    <main className={classes["container"]}>
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
              <p className={classes.info}>{auth?.currentUser?.email}</p>
              <p className={classes.info}></p>
              <p className={classes.info}></p>
            </div>
            <p className={classes.info}>
              YOU HAVEN&apos;T ADDED AN ADDRESS YET.
            </p>
          </div>
          <Link href="" className={classes["address-link"]}>
            view Addresses
          </Link>
        </div>
      </div>
    </main>
  );
}

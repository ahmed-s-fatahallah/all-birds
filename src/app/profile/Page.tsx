"use client";
import Button from "@/utilities/Button";
import { auth } from "@/utilities/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  return (
    <>
      <h1>You are Already logged in</h1>;
      <Button
        variant="submit-btn"
        onClick={() => {
          signOut(auth);
          router.push("/");
        }}
      >
        Log out
      </Button>
    </>
  );
}

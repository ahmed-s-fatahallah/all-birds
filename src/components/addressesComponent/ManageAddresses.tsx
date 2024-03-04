"use client";

import Link from "next/link";
import Button from "@/utilities/Button";
import InputField from "@/components/inputField/InputField";
import {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";

import classes from "./ManageAddresses.module.css";
import { app, auth } from "@/utilities/firebaseConfig";
import { User, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

const MOCKCOUNTRIESCITIESDATA: { [key: string]: string[] } = {
  "United States": ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Salvador"],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario"],
  "United Kingdom": ["London", "Birmingham", "Manchester"],
  France: ["Paris", "Marseille", "Lyon"],
  Germany: ["Berlin", "Hamburg", "Munich"],
  Italy: ["Rome", "Milan", "Naples"],
  Spain: ["Madrid", "Barcelona", "Valencia"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk"],
  China: ["Shanghai", "Beijing", "Tianjin"],
  Japan: ["Tokyo", "Yokohama", "Osaka"],
  "South Korea": ["Seoul", "Busan", "Incheon"],
  India: ["Mumbai", "Delhi", "Bangalore"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban"],
  Egypt: ["Cairo", "Alexandria", "Giza", "Sharkia"],
  Nigeria: ["Lagos", "Kano", "Ibadan"],
  Kenya: ["Nairobi", "Mombasa", "Nakuru"],
};

type FormData = {
  [k: string]: string | boolean;
} & { isDefault: boolean };

export default function ManageAddresses() {
  const [cities, setCities] = useState<string[]>(
    MOCKCOUNTRIESCITIESDATA["United States"]
  );
  const [country, setCountry] = useState<string>("United States");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [user, setUser] = useState<User | null>(null);

  const formElRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFirstName(user.displayName?.split(" ")[0] || "");
        setLastName(user.displayName?.split(" ")[1] || "");
      } else {
        setUser(null);
      }
    });
  }, []);

  const addAddressClickHandler = () => {
    if (formElRef.current) {
      formElRef.current.style.display = "grid";
    }
  };
  const cancelAddAddressClickHandler = () => {
    if (formElRef.current) {
      formElRef.current.style.display = "none";
    }
  };

  const countyChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.currentTarget.value);
    setCities(MOCKCOUNTRIESCITIESDATA[e.currentTarget.value]);
  };

  const addressFormSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;

    const formData: FormData = {
      isDefault:
        formEl.querySelector<HTMLInputElement>(`input[type='checkbox']`)
          ?.checked || false,
    };

    const database = getDatabase(app);

    const formInputEls = Array.from(
      formEl.querySelectorAll<HTMLInputElement>(`input:not([type="checkbox"])`)
    );

    const formSelectEls = Array.from(
      formEl.querySelectorAll<HTMLInputElement>(`select`)
    );

    formInputEls.concat(formSelectEls).forEach((el) => {
      formData[el.name] = el.value;
    });

    if (user) {
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      const oldAddresses = ref(database, "addresses/" + user.uid);
      onValue(oldAddresses, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
      // set(ref(database, "addresses/" + user.uid), [...oldAddresses, formData]);
    } else {
      router.replace("/login");
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
            <form
              className={classes["address-form"]}
              ref={formElRef}
              onSubmit={addressFormSubmitHandler}
            >
              <InputField
                type="text"
                name="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                required
              >
                First name
              </InputField>
              <InputField
                type="text"
                name="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                required
              >
                Last name
              </InputField>
              <InputField type="text" name="company">
                Company
              </InputField>
              <InputField type="text" name="address1" required>
                Address1
              </InputField>
              <InputField type="text" name="address2">
                Address2
              </InputField>
              <InputField type="text" name="city" required>
                City
              </InputField>
              <div className={classes["country-wrapper"]}>
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  onChange={countyChangeHandler}
                  value={country}
                >
                  {Object.keys(MOCKCOUNTRIESCITIESDATA).map((country) => (
                    <option key={crypto.randomUUID()}>{country}</option>
                  ))}
                </select>
              </div>
              <div className={classes["state-wrapper"]}>
                <label htmlFor="state">state</label>
                <select name="state" id="state">
                  {cities.map((city) => (
                    <option key={crypto.randomUUID()} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <InputField type="text" name="postal" required>
                Postal/Zip code
              </InputField>
              <InputField type="tel" name="phone" required>
                Phone
              </InputField>

              <div className={classes["default-wrapper"]}>
                <input type="checkbox" id="default" name="default" />
                <label htmlFor="default">SET AS DEFAULT ADDRESS</label>
              </div>
              <Button variant={"submit-btn"} className={classes["address-btn"]}>
                Add address
              </Button>
              <button
                className={classes["cancel-btn"]}
                type="button"
                onClick={cancelAddAddressClickHandler}
              >
                Cancel
              </button>
            </form>
            <div className={classes["addresses-wrapper"]}></div>
            <Link href="/account" className={classes["back-btn"]}>
              Back to account
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

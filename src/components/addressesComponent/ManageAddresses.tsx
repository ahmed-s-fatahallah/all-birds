"use client";

import {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Button from "@/utilities/Button";
import InputField from "@/components/inputField/InputField";
import { child, get, ref, set } from "firebase/database";

import RenderAddresses from "./renderAddressesComponent/RenderAddresses";
import { auth, database, databaseRef } from "@/utilities/firebaseConfig";
import { User, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getCities, getStates } from "./getStatesCitiesActions";
import { CountryStateCity } from "@/definitions";
import classes from "./ManageAddresses.module.css";

type AddressFormData = {
  [k: string]: string | boolean;
} & { isDefault: boolean };

export default function ManageAddresses({
  countries,
}: {
  countries: CountryStateCity[];
}) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState<CountryStateCity[] | null>(null);
  const [cities, setCities] = useState<CountryStateCity[] | null>(null);

  const formElRef = useRef<HTMLFormElement>(null);
  const chosenCountyRef = useRef<CountryStateCity>(countries[0]);

  const router = useRouter();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFirstName(user.displayName?.split(" ")[0] || "");
        setLastName(user.displayName?.split(" ")[1] || "");
      } else {
        setUser(null);
        router.replace("/login");
      }
    });

    const getInitialStatesCities = async () => {
      setIsLoading(true);
      const initialStates = await getStates(countries[0].iso2);
      setStates(initialStates);
      if (initialStates) {
        const initialCities = await getCities(
          countries[0].iso2,
          initialStates[0].iso2
        );
        setCities(initialCities);
      }
      setIsLoading(false);
    };
    getInitialStatesCities();
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

  const countyChangeHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    chosenCountyRef.current =
      countries.find((country) => country.name === e.currentTarget.value) ||
      countries[0];

    setIsLoading(true);
    const fetchedStates = await getStates(chosenCountyRef.current?.iso2 || "");
    const fetchedCities = await getCities(
      chosenCountyRef.current?.iso2 || "",
      fetchedStates?.[0].iso2 || ""
    );
    setStates(fetchedStates);
    setCities(fetchedCities);
    setIsLoading(false);
  };

  const stateChangeHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const chosenState = states?.find(
      (state) => state.name === e.currentTarget.value
    );

    if (chosenCountyRef.current && chosenState) {
      const fetchedCities = await getCities(
        chosenCountyRef.current.iso2,
        chosenState.iso2
      );

      setCities(fetchedCities);
    }
    setIsLoading(false);
  };

  const addressFormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formEl = e.target as HTMLFormElement;

    const formData: AddressFormData = {
      isDefault:
        formEl.querySelector<HTMLInputElement>(`input[type='checkbox']`)
          ?.checked || false,
      "state-iso":
        states?.find((state) => state.name === formEl.state.value)?.iso2 || "",
    };

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
      try {
        const addressesPath = `users/${user.uid}/addresses`;

        const snapshot = await get(child(databaseRef, addressesPath));

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        if (snapshot.exists() && formData.isDefault) {
          const modifiedData = snapshot
            .val()
            .map((item: AddressFormData) => ({ ...item, isDefault: false }));

          set(ref(database, addressesPath), [...modifiedData, formData]);
        } else if (snapshot.exists() && !formData.isDefault) {
          set(ref(database, addressesPath), [...snapshot.val(), formData]);
        } else {
          set(ref(database, addressesPath), [formData]);
        }

        if (formElRef.current) {
          formElRef.current.reset();
          formElRef.current.style.display = "none";
        }
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) throw Error(error.message);
        setIsLoading(false);
      }
    } else {
      router.replace("/login");
    }
    setIsLoading(false);
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

              <div className={classes["country-wrapper"]}>
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  onChange={countyChangeHandler}
                  disabled={isLoading}
                >
                  {countries?.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={classes["state-wrapper"]}>
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  id="state"
                  onChange={stateChangeHandler}
                  disabled={isLoading}
                >
                  {states && states.length > 0 ? (
                    states?.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))
                  ) : (
                    <option value="">N/A</option>
                  )}
                </select>
              </div>
              <div className={classes["city-wrapper"]}>
                <label htmlFor="city">City</label>
                <select name="city" id="city" disabled={isLoading}>
                  {cities && cities?.length > 0 ? (
                    cities?.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <option value="">N/A</option>
                  )}
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
            <div className={classes["addresses-wrapper"]}>
              {/*TODO: Render list of addresses dynamically*/}
              <RenderAddresses />
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

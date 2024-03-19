import InputField from "@/components/inputField/InputField";
import Button from "@/utilities/Button";
import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Unsubscribe,
  User,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, database, databaseRef } from "@/utilities/firebaseConfig";
import { CountryStateCity } from "@/definitions";
import { getCities, getStates } from "../getStatesCitiesActions";
import { child, get, onValue, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import classes from "./AddressesForm.module.css";

type AddressFormData = {
  [k: string]: string | boolean;
} & { isDefault: boolean };

type AddressFormProps = {
  currentFirstName?: string;
  currentLastName?: string;
  currentCompany?: string;
  currentAddress1?: string;
  currentAddress2?: string;
  currentCountry?: string;
  currentState?: string;
  currentCity?: string;
  currentPostal?: string;
  currentPhone?: string;
  currentIsDefault?: boolean;
} & { countries: CountryStateCity[] };

export default forwardRef<HTMLFormElement, AddressFormProps>(
  function AddressesForm(
    {
      countries,
      currentFirstName,
      currentLastName,
      currentCompany,
      currentAddress1,
      currentAddress2,
      currentCountry,
      currentState,
      currentCity,
      currentPhone,
      currentPostal,
      currentIsDefault,
    },
    formRef
  ) {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [states, setStates] = useState<CountryStateCity[] | null>(null);
    const [cities, setCities] = useState<CountryStateCity[] | null>(null);

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

    const cancelAddAddressClickHandler = () => {
      if (formRef && "current" in formRef && formRef.current) {
        formRef.current.classList.add(classes["show-form"]);
      }
    };

    const countyChangeHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
      chosenCountyRef.current =
        countries.find((country) => country.name === e.currentTarget.value) ||
        countries[0];

      setIsLoading(true);
      const fetchedStates = await getStates(
        chosenCountyRef.current?.iso2 || ""
      );
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

    useEffect(() => {
      let unsubscribe: Unsubscribe;
      const makeFirstAddressDefault = async () => {
        if (user) {
          try {
            const addressesPath = `users/${user.uid}/addresses`;
            unsubscribe = onValue(ref(database, addressesPath), (snapshot) => {
              if (formRef && "current" in formRef && formRef.current) {
                if (!snapshot.exists() || snapshot.val().length === 0) {
                  formRef.current.default.disabled = true;
                  formRef.current.default.checked = true;
                } else {
                  formRef.current.default.disabled = false;
                }
              }
            });
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          }
        }
      };
      makeFirstAddressDefault();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [user]);

    const addressFormSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      e.preventDefault();
      const formEl = e.target as HTMLFormElement;

      const formData: AddressFormData = {
        isDefault:
          formEl.querySelector<HTMLInputElement>(`input[type='checkbox']`)
            ?.checked || false,
        "state-iso":
          states?.find((state) => state.name === formEl.state.value)?.iso2 ||
          "",
      };

      const formInputEls = Array.from(
        formEl.querySelectorAll<HTMLInputElement>(
          `input:not([type="checkbox"])`
        )
      );

      const formSelectEls = Array.from(
        formEl.querySelectorAll<HTMLInputElement>(`select`)
      );

      formInputEls.concat(formSelectEls).forEach((el) => {
        formData[el.name] = el.value.trim();
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
            formData.isDefault = true;
            set(ref(database, addressesPath), [formData]);
          }

          if (formRef && "current" in formRef && formRef.current) {
            formRef.current.reset();
            formRef.current.classList.add(classes["show-form"]);
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
      <form
        className={classes["address-form"]}
        ref={formRef}
        onSubmit={addressFormSubmitHandler}
      >
        <InputField
          type="text"
          name="first-name"
          defaultValue={currentFirstName || firstName}
          onChange={(e) => setFirstName(e.currentTarget.value.trim())}
          required
        >
          First name
        </InputField>
        <InputField
          type="text"
          name="last-name"
          defaultValue={currentLastName || lastName}
          onChange={(e) => setLastName(e.currentTarget.value.trim())}
          required
        >
          Last name
        </InputField>
        <InputField
          type="text"
          name="company"
          defaultValue={currentCompany || ""}
        >
          Company
        </InputField>
        <InputField
          type="text"
          name="address1"
          required
          defaultValue={currentAddress1 || ""}
        >
          Address1
        </InputField>
        <InputField
          type="text"
          name="address2"
          defaultValue={currentAddress2 || ""}
        >
          Address2
        </InputField>

        <div className={classes["country-wrapper"]}>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id="country"
            onChange={countyChangeHandler}
            disabled={isLoading}
            defaultValue={currentCountry || countries[0].name}
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
            defaultValue={currentState || (states && states[0].name) || "N/A"}
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
          <select
            name="city"
            id="city"
            disabled={isLoading}
            defaultValue={currentCity || (cities && cities[0].name) || "N/A"}
          >
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
        <InputField
          type="text"
          name="postal"
          required
          defaultValue={currentPostal || ""}
        >
          Postal/Zip code
        </InputField>
        <InputField
          type="tel"
          name="phone"
          required
          defaultValue={currentPhone || ""}
        >
          Phone
        </InputField>
        <div className={classes["default-wrapper"]}>
          <input
            type="checkbox"
            id="default"
            name="default"
            defaultChecked={currentIsDefault || false}
          />
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
    );
  }
);

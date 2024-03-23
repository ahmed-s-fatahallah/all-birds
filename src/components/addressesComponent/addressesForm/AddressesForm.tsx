import InputField from "@/components/inputField/InputField";
import Button from "@/utilities/Button";
import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
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
  statesList?: CountryStateCity[];
  citiesList?: CountryStateCity[];
  loading?: boolean;
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
  index?: number;
} & { countries: CountryStateCity[] };

export default forwardRef<HTMLFormElement | undefined, AddressFormProps>(
  function AddressesForm(
    {
      countries,
      statesList,
      citiesList,
      loading,
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
      index,
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
    const formElRef = useRef<HTMLFormElement>(null);

    const checkBoxId = useId();

    useImperativeHandle(
      formRef,
      () => {
        if (formElRef.current) return formElRef.current;
      },
      []
    );

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
    }, []);

    useEffect(() => {
      chosenCountyRef.current =
        countries.find((country) => country.name === currentCountry) ||
        countries[0];

      setStates(statesList || null);
      setCities(citiesList || null);
      setIsLoading(loading || false);
    }, [citiesList, statesList, loading, countries, currentCountry]);

    const cancelAddAddressClickHandler = () => {
      if (!formElRef.current) return;
      formElRef.current.classList.remove(classes["show-form"]);
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
      if (!fetchedStates || !fetchedCities) return;
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

        if (!fetchedCities) return;
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
              if (!formElRef.current) return;
              if (!snapshot.exists() || snapshot.val().length === 0) {
                formElRef.current.default.disabled = true;
                formElRef.current.default.checked = true;
              } else {
                formElRef.current.default.disabled = false;
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

          if (index != null) {
            const currentAddresses = snapshot.val();
            if (!currentAddresses || !formElRef.current) return;

            if (
              currentAddresses[index].isDefault &&
              !formData.isDefault &&
              index > 0
            ) {
              currentAddresses[index - 1].isDefault = true;
            }
            currentAddresses[index] = formData;
            set(ref(database, addressesPath), currentAddresses);
            setIsLoading(false);

            formElRef.current.classList.remove(classes["show-form"]);
            return;
          }

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
          if (!formElRef.current) return;
          formElRef.current.reset();
          formElRef.current.classList.remove(classes["show-form"]);

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
        ref={formElRef}
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
            key={states?.length}
            name="state"
            id="state"
            onChange={stateChangeHandler}
            disabled={isLoading}
            defaultValue={currentState}
            style={{ color: isLoading ? "transparent" : "inherit" }}
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
            key={cities?.length}
            name="city"
            id="city"
            disabled={isLoading}
            defaultValue={currentCity}
            style={{ color: isLoading ? "transparent" : "inherit" }}
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
        <div
          className={classes["default-wrapper"]}
          key={currentIsDefault?.toString()}
        >
          <input
            type="checkbox"
            id={checkBoxId}
            name="default"
            defaultChecked={currentIsDefault || false}
          />
          <label htmlFor={checkBoxId}>SET AS DEFAULT ADDRESS</label>
        </div>
        <Button
          variant={"submit-btn"}
          className={classes["address-btn"]}
          disabled={isLoading}
        >
          {index == null ? "Add address" : "Update address"}
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

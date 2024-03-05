"use server";

import { CountryStateCity } from "@/definitions";
import fetchData from "@/utilities/FetchData";

export const getStates = async (
  countyISO: string
): Promise<CountryStateCity[] | null> => {
  let states;
  try {
    states = await fetchData(
      `https://api.countrystatecity.in/v1/countries/${countyISO}/states`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "dGZKTmUzTW9yNzlnOGJQZmI4UE8yaXVrb2t2dHpORXFSSjJOVnZCMw==",
        },
        redirect: "follow",
      }
    );
    return states;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  return null;
};
export const getCities = async (
  countyISO: string,
  stateISO: string
): Promise<CountryStateCity[] | null> => {
  let cities;
  try {
    cities = await fetchData(
      `https://api.countrystatecity.in/v1/countries/${countyISO}/states/${stateISO}/cities`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY":
            "dGZKTmUzTW9yNzlnOGJQZmI4UE8yaXVrb2t2dHpORXFSSjJOVnZCMw==",
        },
        redirect: "follow",
      }
    );
    return cities;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  return null;
};

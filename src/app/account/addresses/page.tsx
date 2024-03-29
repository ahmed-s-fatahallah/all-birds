import ManageAddresses from "@/components/addressesComponent/ManageAddresses";
import ProductApproach from "@/components/productApproach/ProductApproach";
import { CountryStateCity } from "@/definitions";
import fetchData from "@/utilities/FetchData";

const getCountries = async (): Promise<CountryStateCity[]> => {
  const data = await fetchData("https://api.countrystatecity.in/v1/countries", {
    method: "GET",
    headers: {
      "X-CSCAPI-KEY":
        "dGZKTmUzTW9yNzlnOGJQZmI4UE8yaXVrb2t2dHpORXFSSjJOVnZCMw==",
    },
    redirect: "follow",
  });
  return data;
};

export default async function Addresses() {
  try {
    const countries = await getCountries();
    ///////////////////////////////////////////////////////////////////////////////////
    // I don't support children killers and genocide
    const correctCountries = countries.filter((country) => {
      return country.name.toLowerCase() !== "israel";
    });
    ////////////////////////////////////////////////////////////////////////////////////

    return (
      <>
        <ManageAddresses countries={correctCountries} />
        <ProductApproach />
      </>
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

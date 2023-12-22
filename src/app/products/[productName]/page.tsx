import ProductPhotosCarousel from "@/components/productPhotosCarousel/ProductPhotosCarousel";
import ProductRating from "@/components/productRating/ProductRating";

import ProductSection from "@/components/productSection/ProductSection";
import fetchData from "@/utilities/FetchData";
import ProductDescriptionSection from "@/components/productDescriptionSection/ProductDescriptionSection";
import ProductReviews from "@/components/productReviews/ProductReviews";
import ProductApproach from "@/components/productApproach/ProductApproach";

export default async function Page({
  params,
}: {
  params: { productName: string };
}) {
  try {
    const productData = await fetchData(
      `https://react-http-47f95-default-rtdb.firebaseio.com/products/${params.productName}.json`,
      { next: { revalidate: 60 * 60 } }
    );

    return (
      <>
        <div className="container">
          <ProductSection productData={productData} />
          <ProductDescriptionSection />
        </div>
        <ProductPhotosCarousel />
        <ProductRating />
        <div className="container">
          <ProductReviews />
        </div>
        <ProductApproach />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

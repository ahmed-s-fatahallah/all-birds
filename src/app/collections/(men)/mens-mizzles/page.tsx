import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";
import fetchData from "@/utilities/FetchData";
import filterProducts from "@/utilities/FilterProducts";

const MensMizzles = async () => {
  try {
    const allProductsData = await fetchData(
      "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
      { next: { revalidate: 60 * 60 } }
    );

    const { filteredProductsData, filteredProductsNames } = filterProducts(
      allProductsData,
      "mens-mizzles"
    );

    return (
      <section>
        <div className="products__container">
          {filteredProductsData.map((prod: Product, i) => (
            <ProductCard
              key={prod.id}
              product={prod}
              productName={filteredProductsNames[i]}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};

export default MensMizzles;

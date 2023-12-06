import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getProductsData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();

  const allProductsSortedData = Object.values<Product>(data).sort(
    (a, b) => a.id - b.id
  );

  return allProductsSortedData;
};

const Mens = async () => {
  try {
    const allProductsData = await getProductsData();

    return (
      <section>
        <div className="products__container">
          {allProductsData.map((prod: Product) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};

export default Mens;

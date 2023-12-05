import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getProductsData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products/men.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();

  return data;
};

const Mens = async () => {
  let allProducts: Product[] = [];
  try {
    const data = await getProductsData();
    allProducts = Object.values<Product>(data)
      .flat(1)
      .sort((a, b) => a.id - b.id);
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <div className="products__container">
        {allProducts.map((prod: Product) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default Mens;

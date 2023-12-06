import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensLoungersData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  const mensLoungersData: Product[] = Object.values<Product>(data).filter(
    (prod: Product) => prod.collection === "mens-loungers"
  );
  return mensLoungersData;
};

const MensRunners = async () => {
  try {
    const mensLoungersData = await getMensLoungersData();

    return (
      <section>
        <div className="products__container">
          {mensLoungersData.map((prod: Product) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};

export default MensRunners;

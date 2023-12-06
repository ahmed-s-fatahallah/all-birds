import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensHikingShoesData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  const mensHikingShoesData: Product[] = Object.values<Product>(data).filter(
    (prod: Product) => prod.collection === "mens-hiking-shoes"
  );
  return mensHikingShoesData;
};

const MensTrialRunnersSWT = async () => {
  try {
    const mensHikingShoesData = await getMensHikingShoesData();

    return (
      <section>
        <div className="products__container">
          {mensHikingShoesData.map((prod: Product) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};

export default MensTrialRunnersSWT;

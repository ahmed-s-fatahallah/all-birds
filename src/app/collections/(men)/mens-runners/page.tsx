import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensRunnersData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  const mensRunnersData: Product[] = Object.values<Product>(data).filter(
    (prod: Product) => prod.collection === "mens-runners"
  );
  return mensRunnersData;
};

const MensRunners = async () => {
  try {
    const mensRunnerData = await getMensRunnersData();

    return (
      <section>
        <div className="products__container">
          {mensRunnerData.map((prod: Product) => (
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

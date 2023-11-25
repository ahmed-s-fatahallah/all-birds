import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensRunnersData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products/men/mens-runners.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  return data;
};

const MensRunners = async () => {
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
};

export default MensRunners;

import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensTrialRunnersSWTData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products/men/mens-hiking-shoes.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  return data;
};

const MensTrialRunnersSWT = async () => {
  const mensRunnerData = await getMensTrialRunnersSWTData();

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

export default MensTrialRunnersSWT;

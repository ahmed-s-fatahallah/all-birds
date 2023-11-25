import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensRunningShoesData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products/men/mens-running-shoes.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  return data;
};

const MensRunnersShoes = async () => {
  const mensRunningShoes = await getMensRunningShoesData();
  return (
    <section>
      <div className="products__container">
        {mensRunningShoes.map((prod: Product) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default MensRunnersShoes;

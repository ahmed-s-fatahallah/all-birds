import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensMizzlesData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products/men/mens-mizzles.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  return data;
};

const MensMizzles = async () => {
  const mensRunnerData = await getMensMizzlesData();

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

export default MensMizzles;

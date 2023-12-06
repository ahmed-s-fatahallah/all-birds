import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensRunningShoesData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  const mensRunningShoesData: Product[] = Object.values<Product>(data).filter(
    (prod: Product) => prod.collection === "mens-running-shoes"
  );
  return mensRunningShoesData;
};

const MensRunnersShoes = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

export default MensRunnersShoes;

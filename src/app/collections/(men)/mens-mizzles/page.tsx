import ProductCard from "@/components/card/ProductCard";
import { Product } from "@/definitions";

const getMensMizzlesData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json",
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();
  const mensMizzlesData: Product[] = Object.values<Product>(data).filter(
    (prod: Product) => prod.collection === "mens-mizzles"
  );
  return mensMizzlesData;
};

const MensMizzles = async () => {
  try {
    const mensMizzleData = await getMensMizzlesData();

    return (
      <section>
        <div className="products__container">
          {mensMizzleData.map((prod: Product) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.log(error);
  }
};

export default MensMizzles;

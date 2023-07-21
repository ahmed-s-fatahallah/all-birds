import ProductCard from "@/components/card/ProductCard";

type Color = { colorName: string; imgs: string[] };

interface Product {
  bigImgs: string[];
  colors: Color[];
  displayImg: string;
  id: number;
  price: string;
  sizes: number[] | string[];
  title: string;
  video: string;
}

const getProductsData = async () => {
  const res = await fetch(
    "https://react-http-47f95-default-rtdb.firebaseio.com/products.json"
  );
  const data = await res.json();

  return data;
};

const Mens = async () => {
  let data;
  try {
    data = await getProductsData();
  } catch (error) {
    console.log(error);
  }
  return (
    <section>
      <div className="products__container">
        {data.men.map((prod: Product) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default Mens;

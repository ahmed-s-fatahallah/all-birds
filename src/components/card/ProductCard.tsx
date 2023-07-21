import SizeFilterBtn from "@/utilities/SizeFilterBtn";
import Image from "next/image";

import classes from "./ProductCard.module.css";
import ColorsSlider from "./ColorsSlider";

type Color = { colorName: string; imgs: string[] };

interface Product {
  product: {
    bigImgs: string[];
    colors: Color[];
    displayImg: string;
    id: number;
    price: string;
    sizes: number[] | string[];
    title: string;
    video: string;
  };
}

const ProductCard = ({ product }: Product) => {
  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-main"]}>
        <div className={classes["card-main__img"]}>
          <Image
            src={product.colors[0].imgs[0]}
            alt={product.colors[0].colorName}
            width={308}
            height={308}
          />
        </div>
        <p className={classes["card-main__name"]}>{product.title}</p>
        <p className={classes["card-main__color"]}>
          {product.colors[0].colorName}
        </p>
        <p>{`$${product.price}`}</p>
        <ColorsSlider colors={product.colors} />
      </div>
      <div className={classes["card-secondary"]}>
        <p className={classes["card-secondary__title"]}>Quick Add</p>
        <div>
          {product.sizes.map((size) => (
            <SizeFilterBtn key={size} size={size} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

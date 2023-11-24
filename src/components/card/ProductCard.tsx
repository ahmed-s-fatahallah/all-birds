"use client";

import SizeFilterBtn from "@/utilities/SizeFilterBtn";
import Image from "next/image";
import { useState } from "react";
import ColorsSlider from "./ColorsSlider";
import { Color, Product } from "@/definitions";

import classes from "./ProductCard.module.css";

const ProductCard = ({ product }: { product: Product }) => {
  const [currentProductColor, setCurrentProductColor] = useState<Color>();

  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-main"]}>
        <div className={classes["card-main__img"]}>
          <Image
            src={currentProductColor?.imgs[0] || product.colors[0].imgs[0]}
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
        <ColorsSlider
          colors={product.colors}
          setCurrentProductColor={setCurrentProductColor}
        />
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

"use client";

import Image from "next/image";
import { useState } from "react";
import ColorsSlider from "./ColorsSlider";
import { Color, Product } from "@/definitions";

import classes from "./ProductCard.module.css";
import Link from "next/link";
import Button from "@/utilities/Button";

const ProductCard = ({
  product,
  productName,
}: {
  product: Product;
  productName: string;
}) => {
  const [currentProductColor, setCurrentProductColor] = useState<Color>();

  return (
    <div className={classes["card-container"]}>
      <div className={classes["card-main"]}>
        <Link href={`/products/${productName}`}>
          <div>
            <div className={classes["card-main__img"]}>
              <Image
                draggable={false}
                src={currentProductColor?.imgs[0] || product.colors[0].imgs[0]}
                alt={product.colors[0].colorName}
                width={308}
                height={308}
              />
            </div>
            <p className={classes["card-main__name"]}>{product.title}</p>
            {/* <p className={classes["card-main__color"]}>
              {product.colors[0].colorName}
            </p> */}
          </div>
        </Link>
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
            <Button key={size} variant="filter-btn">
              <span>{size}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

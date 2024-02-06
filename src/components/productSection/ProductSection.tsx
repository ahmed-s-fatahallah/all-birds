"use client";
import classes from "./ProductSection.module.css";
import Button from "@/utilities/Button";
import Image from "next/image";
import ProductSlider from "../productSlider/ProductSlider";
import { Color, Product } from "@/definitions";
import ProductAccordion from "../productAccordion/ProductAccordion";
import Link from "next/link";
import { MouseEvent, useEffect, useRef, useState } from "react";
import SizesChartDialog from "../sizesChartDialog/SizesChartDialog";
import collectionsMapper from "@/utilities/collectionsMapper";

import {
  MOCKDATADETAILS,
  MOCKDATASUSTAINABILITY,
  MOCKDATASHIPPING,
  MOCKDATACARE,
  MockDataReviews,
} from "@/utilities/MockData";

export default function ProductSection({
  productData,
  randomProducts,
}: {
  productData: Product;
  randomProducts: { [productName: string]: Product }[];
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const sizesBtnContainerRef = useRef<HTMLUListElement>(null);
  const colorsContainerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const selectSizeHandler = (e: MouseEvent) => {
    const selectedBtnEl = e.currentTarget;

    if (selectedBtnEl.textContent === selectedSize) {
      selectedBtnEl.classList.remove(`${classes.selected}`);
      setSelectedSize(null);
      return;
    }

    setSelectedSize(selectedBtnEl.textContent);
    sizesBtnContainerRef.current
      ?.querySelector(`.${classes.selected}`)
      ?.classList.remove(`${classes.selected}`);

    selectedBtnEl.classList.add(`${classes.selected}`);
  };

  const selectColorClickHandler = (color: Color, e: MouseEvent) => {
    colorsContainerRef.current
      ?.querySelector(`span[aria-selected="true"]`)
      ?.removeAttribute("aria-selected");
    (e.target as HTMLSpanElement).ariaSelected = "true";
    setSelectedColor(color);
  };

  const sizeChartClickHandler = () => {
    dialogRef.current?.showModal();
    document.body.style.overflowY = "hidden";
  };

  const getRandomProductsJSX = (
    randomProducts: {
      [name: string]: Product;
    }[]
  ) => {
    const jsxElements = randomProducts.map((product) => {
      for (const [name, productData] of Object.entries(product)) {
        return (
          <Link href={`/products/${name}`} key={name}>
            <Image
              src={productData.colors[0].sliderImg}
              alt="recommended random products"
              width={217}
              height={217}
            />
            <p>{productData.title}</p>
          </Link>
        );
      }
    });
    return jsxElements;
  };

  return (
    <section className={classes["main-section"]}>
      <SizesChartDialog dialogRef={dialogRef} />
      <ProductSlider
        productColor={selectedColor}
        productVideo={productData?.video}
        productDisplayImg={productData.displayImg}
        productVidThumbnail={productData?.videoThumbnail}
      />
      <div className={classes["product-options"]}>
        <div className={classes.path}>
          <Link href="/">Home</Link>/{" "}
          <Link href="/collections/mens">Men&apos;s shoes</Link>/
          <Link href={`/collections/${productData.collection}`}>
            {collectionsMapper[productData.collection]}
          </Link>
          /
        </div>
        <h1 className={classes["main-product-title"]}>{productData.title}</h1>
        <div className={classes["price-container"]}>
          <p>{`$${productData.price}`}</p>
          {+productData.price > 75 && (
            <div className={classes["free-shipping"]}>FREE SHIPPING</div>
          )}
        </div>
        <Link href="#rating-section" className={classes["rating-container"]}>
          <div className={classes.stars}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Full Star</title>
              <polygon
                fill="#212a2f"
                points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
              ></polygon>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="13"
              height="13"
            >
              <title>Half Full Star</title>
              <defs></defs>
              <path
                className="cls-1"
                d="M23,8.8l-8-1.21L11.51,0,8,7.59,0,8.8l5.75,5.9L4.4,23l7.11-3.93L18.62,23,17.26,14.7ZM17.3,21.15,12,18.22,11.51,18h0V2.37L14.16,8l.23.48.52.08,6,.92L16.55,14l-.36.36.08.5Z"
                transform="translate(-.01 -.02)"
              ></path>
            </svg>
          </div>

          <div className={classes["number-of-reviews"]}>
            ({MockDataReviews.length})
          </div>
        </Link>
        <div className={classes["colors-container"]} ref={colorsContainerRef}>
          {productData.colors.some((color) => color.type === "classic") && (
            <div className={classes["color-row"]}>
              <div>
                <span className={classes["colors-type"]}>Classics:</span>
                {selectedColor.type === "classic" && (
                  <span>{selectedColor.colorName}</span>
                )}
              </div>
              <div className={classes["color-select"]}>
                {productData.colors.map((color, i) => {
                  if (color.type !== "classic") return;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={classes.color}
                      title="color picker"
                      onClick={selectColorClickHandler.bind(null, color)}
                    >
                      <span
                        aria-selected={color === productData.colors[0]}
                        style={{ background: `${color.rgb}` }}
                      ></span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {productData.colors.some((color) => color.type === "limited") && (
            <div className={classes["color-row"]}>
              <div>
                <span className={classes["colors-type"]}>limited edition:</span>
                {selectedColor.type === "limited" && (
                  <span>{selectedColor.colorName}</span>
                )}
              </div>
              <div className={classes["color-select"]}>
                {productData.colors.map((color, i) => {
                  if (color.type !== "limited") return;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={classes.color}
                      title="color picker"
                      onClick={selectColorClickHandler.bind(null, color)}
                    >
                      <span
                        aria-selected={color === productData.colors[0]}
                        style={{ background: `${color.rgb}` }}
                      ></span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {productData.colors.some((color) => color.type === "sale") && (
            <div className={classes["color-row"]}>
              <div>
                <span className={classes["colors-type"]}>sale:</span>
                {selectedColor.type === "sale" && (
                  <span>{selectedColor.colorName}</span>
                )}
              </div>
              <div className={classes["color-select"]}>
                {productData.colors.map((color, i) => {
                  if (color.type !== "sale") return;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={classes.color}
                      title="color picker"
                      onClick={selectColorClickHandler.bind(null, color)}
                    >
                      <span
                        aria-selected={color === productData.colors[0]}
                        style={{ background: `${color.rgb}` }}
                      ></span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className={classes["size-container"]}>
          <p>select size</p>
          <ul className={classes["sizes-list"]} ref={sizesBtnContainerRef}>
            {productData.sizes.map((size, i) => (
              <li key={i}>
                <Button variant="filter-btn" onClick={selectSizeHandler}>
                  <span>{size}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <p className={classes["size-chart-text"]}>
          This style is available in whole sizes only. In between sizes? We
          recommend you size up.{" "}
          <button onClick={sizeChartClickHandler}>See Size Chart</button>
        </p>
        <Button variant="add-to-cart-btn" disabled={!Boolean(selectedSize)}>
          {selectedSize
            ? `Add to cart - $${productData.price}`
            : "Select a size"}
        </Button>
        <div className={classes["promo-banner"]}>
          <h3>Don&apos;t Be Fa-la-late</h3>
          <p>
            Use code <b> GET30 </b> at checkout. <br />
            <u> Exclusions apply </u>
          </p>
        </div>
        <p className={classes["shipping-policy"]}>
          Free shipping on orders over $75. Free returns.
        </p>
        <div className={classes.recommendations}>
          <p>Also consider</p>
          <div className={classes["recommendations__container"]}>
            {getRandomProductsJSX(randomProducts)}
          </div>
        </div>
      </div>
      <div className={classes.highlights}>
        <h2>Tree Runner Highlights</h2>
        <hr />
        <p>
          Lightweight, breathable eucalyptus fiber provides next-level comfort
        </p>
        <hr />
        <p>Cushioned midsole gives wear-all-day support</p>
        <hr />
        <p>Machine-washable materials keep shoes looking like new</p>
      </div>
      <ProductAccordion
        details={MOCKDATADETAILS}
        sustainability={MOCKDATASUSTAINABILITY}
        care={MOCKDATACARE}
        shipping={MOCKDATASHIPPING}
      />
      {productData.id === 0 && (
        <div className={classes["big-img-container"]}>
          <Image
            draggable={false}
            src="https://cdn.dynamicyield.com/api/8776313/images/116be0f9f3ae6__product_features_module-tr_desktop_intrinsic.jpg"
            alt="product details"
            width={1196}
            height={580}
          />
        </div>
      )}
    </section>
  );
}

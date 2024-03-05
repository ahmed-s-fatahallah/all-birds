import { Dispatch, SetStateAction } from "react";

export type Color = {
  colorName: string;
  imgs: string[];
  sliderImg: string;
  type: "classic" | "limited" | "sale";
  rgb: string;
};

export interface ProductData {
  [key: string]: Product;
}

export type BigImages = {
  img: string;
  "s-title": string;
  "b-title": string;
  text: string;
}[];
export interface Product {
  id: number;
  collection: string;
  price: string;
  title: string;
  sizes: number[] | string[];
  video: string;
  videoThumbnail: string;
  bigImgs: BigImages;
  colors: Color[];
  displayImg: string;
  "slider-imgs"?: string[];
}

export interface ColorSliderProps {
  colors: Color[];
  setCurrentProductColor: Dispatch<SetStateAction<Color | undefined>>;
}

export type CountryStateCity = { id: number; name: string; iso2: string };

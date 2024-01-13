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

export interface Product {
  id: number;
  collection: string;
  price: string;
  title: string;
  sizes: number[] | string[];
  video: string;
  videoThumbnail: string;
  bigImgs: string[];
  colors: Color[];
  displayImg: string;
}

export interface ColorSliderProps {
  colors: Color[];
  setCurrentProductColor: Dispatch<SetStateAction<Color | undefined>>;
}

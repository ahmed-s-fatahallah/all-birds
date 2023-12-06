import { Dispatch, SetStateAction } from "react";

export type Color = { colorName: string; imgs: string[]; sliderImg: string };

export interface Product {
  id: number;
  collection: string;
  price: string;
  title: string;
  sizes: number[] | string[];
  video: string;
  bigImgs: string[];
  colors: Color[];
  displayImg: string;
}

export interface ColorSliderProps {
  colors: Color[];
  setCurrentProductColor: Dispatch<SetStateAction<Color | undefined>>;
}

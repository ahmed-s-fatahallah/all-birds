import { Dispatch, SetStateAction } from "react";

export type Color = { colorName: string; imgs: string[]; sliderImg: string };

export interface Product {
  bigImgs: string[];
  colors: Color[];
  displayImg: string;
  id: number;
  price: string;
  sizes: number[] | string[];
  title: string;
  video: string;
}

export interface ColorSliderProps {
  colors: Color[];
  setCurrentProductColor: Dispatch<SetStateAction<Color | undefined>>;
}

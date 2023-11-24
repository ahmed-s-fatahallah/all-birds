"use client";
import { useState } from "react";
import classes from "./ColorsSlider.module.css";

import { Color, ColorSliderProps } from "@/definitions";

const ColorsSlider = ({ colors, setCurrentProductColor }: ColorSliderProps) => {
  const [activeButton, setActiveButton] = useState(0);
  const sliderClickHandler = (index: number, e: React.MouseEvent) => {
    setCurrentProductColor(colors[index]);
    setActiveButton(index);
  };

  return (
    <div className={classes["slider-container"]}>
      {/* <button type="button" className={classes["slider-container__arrow-left"]}>
        <span></span>
      </button> */}
      <div className={classes.colors__container}>
        {colors.map((color: Color, i) => (
          <button
            title="product color picker"
            onClick={sliderClickHandler.bind(null, i)}
            type="button"
            key={i}
            style={{ backgroundImage: `url(${color.sliderImg})` }}
            className={i === activeButton ? classes.selected : ""}
          ></button>
        ))}
      </div>
      {/* <button
        type="button"
        className={classes["slider-container__arrow-right"]}
      >
        <span></span>
      </button> */}
    </div>
  );
};

export default ColorsSlider;

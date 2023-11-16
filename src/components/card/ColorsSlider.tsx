import classes from "./ColorsSlider.module.css";

type Color = { colorName: string; imgs: string[] };

interface ColorSliderProps {
  colors: Color[];
}

const ColorsSlider = ({ colors }: ColorSliderProps) => {
  return (
    <div className={classes["slider-container"]}>
      <button type="button" className={classes["slider-container__arrow-left"]}>
        <span></span>
      </button>
      <div className={classes.colors__container}>
        {colors.map((color: Color, i) => (
          <button
            type="button"
            key={i}
            style={{ backgroundImage: `url(${color.imgs[1]})` }}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className={classes["slider-container__arrow-right"]}
      >
        <span></span>
      </button>
    </div>
  );
};

export default ColorsSlider;

import classes from "./ColorsSlider.module.css";

const ColorsSlider = () => {
  return (
    <div className={classes["slider-container"]}>
      <button className={classes["slider-container__arrow-left"]}>
        <span></span>
      </button>
      <div className={classes.colors__container}>
        <button className={classes.selected}></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <button className={classes["slider-container__arrow-right"]}>
        <span></span>
      </button>
    </div>
  );
};

export default ColorsSlider;

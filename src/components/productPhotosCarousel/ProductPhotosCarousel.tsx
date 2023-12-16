import classes from "./ProductPhotosCarousel.module.css";

export default function ProductPhotosCarousel() {
  return (
    <div className={classes["product-carousel"]}>
      <p>Worn In The Wild</p>
      <div className={classes["slider-container"]}>
        <div className={classes.slider}>
          <img
            src="https://cdn.dynamicyield.com/api/8776313/images/30d230234c2fd__frame_9.jpg"
            alt=""
          />
          <img
            src="https://cdn.dynamicyield.com/api/8776313/images/30d230234c2fd__frame_9.jpg"
            alt=""
          />
          <img
            src="https://cdn.dynamicyield.com/api/8776313/images/30d230234c2fd__frame_9.jpg"
            alt=""
          />
          <img
            src="https://cdn.dynamicyield.com/api/8776313/images/30d230234c2fd__frame_9.jpg"
            alt=""
          />
          <img
            src="https://cdn.dynamicyield.com/api/8776313/images/30d230234c2fd__frame_9.jpg"
            alt=""
          />
        </div>
        <button type="button" className={classes["slider-btn"]}>
          <span className="chevron chevron-left"></span>
        </button>
        <button type="button" className={classes["slider-btn"]}>
          <span className="chevron chevron-right"></span>
        </button>
      </div>
    </div>
  );
}

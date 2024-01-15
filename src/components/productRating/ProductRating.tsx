import classes from "./ProductRating.module.css";

export default function ProductRating() {
  return (
    <div className={classes["rating-container"]} id="rating-section">
      <div className={classes.container}>
        <p className={classes["rating-title"]}>
          Men&apos;s Tree Runners Reviews
        </p>
        <div className={classes["stars-container"]}>
          <p>4.6</p>
          <div className={classes.stars}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23 23"
              width="23"
              height="23"
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
              width="23"
              height="23"
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
              width="23"
              height="23"
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
              width="23"
              height="23"
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
              width="23"
              height="23"
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
        </div>
        <p className={classes["reviews-count"]}>7230 Reviews</p>
        <div className={classes["fit-score-container"]}>
          <p>Size</p>
          <div className={classes["line-container"]}>
            <div className={classes.line}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={classes.indicator}></div>
            <p>Runs Small</p>
            <p>True to Size</p>
            <p>Runs Large</p>
          </div>
        </div>
        <p>
          This style is available in whole sizes only. In between sizes? We
          recommend you size up.
        </p>
      </div>
    </div>
  );
}

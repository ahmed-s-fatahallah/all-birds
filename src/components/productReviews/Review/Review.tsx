import classes from "./Review.module.css";

export default function Review({
  name,
  isVerified,
  size,
  width,
  purchasedSize,
  fit,
  activity,
  stars,
  header,
  msg,
  date,
}: {
  name: string;
  isVerified: boolean;
  size: number;
  width: string;
  purchasedSize: number;
  fit: string;
  activity: string;
  stars: number;
  header: string;
  msg: string;
  date: string;
}) {
  let starsEls = [];
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starsEls.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 23 23"
          width="17"
          height="17"
        >
          <title>Full Star</title>
          <polygon
            fill="#212a2f"
            points="23,8.8 15,7.6 11.5,0 8,7.6 0,8.8 5.7,14.7 4.4,23 11.5,19 18.6,23 17.2,14.7"
          ></polygon>
        </svg>
      );
    } else {
      starsEls.push(
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 23 23"
          width="17"
          height="17"
        >
          <title>Empty Star</title>
          <defs></defs>
          <path
            d="M11.51,2.37,14.16,8l.23.48.52.08,6,.92L16.55,14l-.36.36.08.5,1,6.29L12,18.22,11.51,18l-.48.27L5.72,21.15l1-6.29.08-.5L6.48,14,2.09,9.5l6-.92.53-.08L8.86,8l2.65-5.65m0-2.35L8,7.59,0,8.8l5.75,5.9L4.4,23l7.11-3.93L18.62,23,17.26,14.7,23,8.8l-8-1.21L11.51,0Z"
            transform="translate(-.01 -.02)"
          ></path>
        </svg>
      );
    }
  }

  return (
    <div className={classes["review"]}>
      <div className={classes.review__content}>
        <div className={classes.stars}>{starsEls.map((star) => star)}</div>
        <h3 className={classes["review__content__header"]}>{header}</h3>
        <p className={classes["review__content__text"]}>{msg}</p>
        <p className={classes["review__content__date"]}>{date}</p>
      </div>
      <div className={classes.review__details}>
        <div>
          <p className={classes["review__author"]}>{name}</p>
          {isVerified && (
            <p className={classes["review__verified"]}>Verified Buyer</p>
          )}
        </div>

        <ul>
          <li>
            <span>Typical Size:</span>
            <span>{size}</span>
          </li>
          <li>
            <span>Typical Width:</span>
            <span>{width}</span>
          </li>
          <li>
            <span>Size Purchased:</span>
            <span>{purchasedSize}</span>
          </li>
          <li>
            <span>Overall Fit:</span>
            <span>{fit}</span>
          </li>
          <li>
            <span>Activity Level:</span>
            <span>{activity}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

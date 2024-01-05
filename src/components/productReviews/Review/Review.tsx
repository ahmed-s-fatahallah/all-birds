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
  for (let i = 0; i < stars; i++) {
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

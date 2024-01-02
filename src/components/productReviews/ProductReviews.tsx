"use client";
import Link from "next/link";
import classes from "./ProductReviews.module.css";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef } from "react";

export default function ProductReviews() {
  const clearFiltersBtnRef = useRef<HTMLButtonElement>(null);
  const formElRef = useRef<HTMLFormElement>(null);

  const valueChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!formElRef.current || !clearFiltersBtnRef.current) return;
    const selectEl = (e.target as HTMLSelectElement)!;
    const selectElsArr: HTMLSelectElement[] = Array.from(
      formElRef.current.querySelectorAll("select:not(#sort)")
    );

    if (selectEl.value === "all") {
      selectEl.style.color = "transparent";
    } else {
      selectEl.style.color = "inherit";
    }

    if (selectElsArr.some((el) => el.value !== "all")) {
      clearFiltersBtnRef.current.style.display = "block";
    } else {
      clearFiltersBtnRef.current.style.display = "none";
    }
  };

  const clearFiltersHandler = () => {
    if (!formElRef.current || !clearFiltersBtnRef.current) return;
    const selectElsArr: HTMLSelectElement[] = Array.from(
      formElRef.current.querySelectorAll("select:not(#sort)")
    );
    selectElsArr.forEach((el) => {
      el.value = "all";
      el.style.color = "transparent";
    });
    clearFiltersBtnRef.current.style.display = "none";
  };

  return (
    <>
      <form className={classes["reviews-filters"]} ref={formElRef}>
        <div className={classes["search-box"]}>
          <label htmlFor="search">Search</label>
          <div>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter Search Term"
            />
            <button type="button">
              <Image
                draggable={false}
                src="//cdn.allbirds.com/image/upload/v1630526687/icons/search-fixed.svg"
                alt="magnifying glass"
                width={11}
                height={11}
              />
            </button>
          </div>
        </div>
        <div className={classes["sort-box"]}>
          <label htmlFor="sort">Sort by</label>
          <div>
            <select id="sort" name="sort">
              <option value="newest" selected>
                Newest
              </option>
              <option value="oldest">Oldest</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="lowest-rated">Lowest Rated</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
          </div>
        </div>

        <div className={classes["rating-box"]}>
          <label htmlFor="rating">Star Rating</label>
          <div>
            <select id="rating" name="rating" onChange={valueChangeHandler}>
              <option value="all" selected>
                All
              </option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="4">★★★★★</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["size-box"]}>
          <label htmlFor="size">Typical Size</label>
          <div>
            <select id="size" name="size" onChange={valueChangeHandler}>
              <option value="all">All</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["width-box"]}>
          <label htmlFor="width">Typical Width</label>
          <div>
            <select id="width" name="width" onChange={valueChangeHandler}>
              <option value="all" selected>
                All
              </option>
              <option value="narrow">Narrow</option>
              <option value="average">Average</option>
              <option value="wide">Wide</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["purchased-box"]}>
          <label htmlFor="purchased">Size Purchased</label>
          <div>
            <select
              id="purchased"
              name="purchased"
              onChange={valueChangeHandler}
            >
              <option value="all">All</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["fit-box"]}>
          <label htmlFor="fit">Overall Fit</label>
          <div>
            <select id="fit" name="fit" onChange={valueChangeHandler}>
              <option value="all" selected>
                All
              </option>
              <option value="small">Runs Small</option>
              <option value="right">Just Right</option>
              <option value="big">Runs Big</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["activity-box"]}>
          <label htmlFor="activity">Activity Level</label>
          <div>
            <select id="activity" name="activity" onChange={valueChangeHandler}>
              <option value="all" selected>
                All
              </option>
              <option value="house">Around The House</option>
              <option value="walking">Walking</option>
              <option value="commuting">Commuting</option>
              <option value="errands">Running Errands</option>
              <option value="traveling">Traveling</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button type="button" title="clear filter">
              <span></span>
            </button>
          </div>
        </div>
      </form>
      <div className={classes["reviews-list"]}>
        <div className={classes["reviews-list__header"]}>
          <p>142 Reviews</p>
          <button
            type="button"
            ref={clearFiltersBtnRef}
            onClick={clearFiltersHandler}
          >
            Clear All Filters
          </button>
        </div>
        <div className={classes["reviews"]}>
          <div className={classes["review"]}>
            <div className={classes.review__content}>
              <div className={classes.stars}>
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
              </div>
              <h3 className={classes["review__content__header"]}>
                Very comfortable.
              </h3>
              <p className={classes["review__content__text"]}>
                Very comfortable.
              </p>
              <p className={classes["review__content__date"]}>
                December 1, 2023
              </p>
            </div>
            <div className={classes.review__details}>
              <div>
                <p className={classes["review__author"]}>Ed C.</p>
                <p className={classes["review__verified"]}>Verified Buyer</p>
              </div>

              <ul>
                <li>
                  <span>Typical Size:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Typical Width:</span>
                  <span>Average</span>
                </li>
                <li>
                  <span>Size Purchased:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Overall Fit:</span>
                  <span>Just Right</span>
                </li>
                <li>
                  <span>Activity Level:</span>
                  <span>Walking, Running Errands</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes["review"]}>
            <div className={classes.review__content}>
              <div className={classes.stars}>
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
              </div>
              <h3 className={classes["review__content__header"]}>
                Very comfortable.
              </h3>
              <p className={classes["review__content__text"]}>
                Very comfortable.
              </p>
              <p className={classes["review__content__date"]}>
                December 1, 2023
              </p>
            </div>
            <div className={classes.review__details}>
              <div>
                <p className={classes["review__author"]}>Ed C.</p>
                <p className={classes["review__verified"]}>Verified Buyer</p>
              </div>

              <ul>
                <li>
                  <span>Typical Size:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Typical Width:</span>
                  <span>Average</span>
                </li>
                <li>
                  <span>Size Purchased:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Overall Fit:</span>
                  <span>Just Right</span>
                </li>
                <li>
                  <span>Activity Level:</span>
                  <span>Walking, Running Errands</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={classes["review"]}>
            <div className={classes.review__content}>
              <div className={classes.stars}>
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
              </div>
              <h3 className={classes["review__content__header"]}>
                Very comfortable.
              </h3>
              <p className={classes["review__content__text"]}>
                Very comfortable.
              </p>
              <p className={classes["review__content__date"]}>
                December 1, 2023
              </p>
            </div>
            <div className={classes.review__details}>
              <div>
                <p className={classes["review__author"]}>Ed C.</p>
                <p className={classes["review__verified"]}>Verified Buyer</p>
              </div>

              <ul>
                <li>
                  <span>Typical Size:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Typical Width:</span>
                  <span>Average</span>
                </li>
                <li>
                  <span>Size Purchased:</span>
                  <span>8</span>
                </li>
                <li>
                  <span>Overall Fit:</span>
                  <span>Just Right</span>
                </li>
                <li>
                  <span>Activity Level:</span>
                  <span>Walking, Running Errands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.pages}>
          <Link href="#">
            <span className="chevron chevron-left"></span>
          </Link>
          <Link href="#">
            <p>1</p>
          </Link>
          <Link href="#">
            <p>2</p>
          </Link>
          <Link href="#">
            <p>3</p>
          </Link>
          <Link href="#">
            <p>4</p>
          </Link>
          <Link href="#">
            <p>5</p>
          </Link>
          <Link href="#">
            <span className="chevron chevron-right"></span>
          </Link>
        </div>
      </div>
    </>
  );
}

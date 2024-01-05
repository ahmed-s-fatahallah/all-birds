"use client";
import Link from "next/link";
import classes from "./ProductReviews.module.css";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import Review from "./Review/Review";

const MockData = [
  {
    name: "Osama Salem",
    isVerified: true,
    size: 9,
    width: "Average",
    purchasedSize: 9,
    fit: "Just Right",
    activity: "Walking, Running, Errands",
    stars: 5,
    header: "Very Comfortable.",
    msg: "Very Comfortable",
    date: "December 3, 2023",
  },
  {
    name: "Ahmed Saeed",
    isVerified: true,
    size: 8,
    width: "Average",
    purchasedSize: 8,
    fit: "Just Right",
    activity: "Walking, Running",
    stars: 4,
    header: "Very Comfortable.",
    msg: "Very Comfortable",
    date: "December 1, 2023",
  },
  {
    name: "Karim Shalapy",
    isVerified: false,
    size: 10,
    width: "wide",
    purchasedSize: 10,
    fit: "Runs Big",
    activity: "Traveling",
    stars: 2,
    header: "Very Comfortable.",
    msg: "Very Large",
    date: "December 2, 2023",
  },
  {
    name: "Osama Salem",
    isVerified: true,
    size: 9,
    width: "Average",
    purchasedSize: 9,
    fit: "Just Right",
    activity: "Walking, Running, Errands",
    stars: 5,
    header: "Very Comfortable.",
    msg: "Very Comfortable",
    date: "December 3, 2023",
  },
  {
    name: "Ahmed Saeed",
    isVerified: true,
    size: 8,
    width: "Average",
    purchasedSize: 8,
    fit: "Just Right",
    activity: "Walking, Running",
    stars: 4,
    header: "Very Comfortable.",
    msg: "Very Comfortable",
    date: "December 1, 2023",
  },
  {
    name: "Karim Shalapy",
    isVerified: false,
    size: 10,
    width: "wide",
    purchasedSize: 10,
    fit: "Runs Big",
    activity: "Traveling",
    stars: 2,
    header: "Very Comfortable.",
    msg: "Very Large",
    date: "December 2, 2023",
  },
];

export default function ProductReviews() {
  const [shownReviews, setShownReviews] = useState(
    MockData.sort((b, a) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    })
  );
  const [filters, setFilters] = useState<{
    rating: string;
    size: string;
    width: string;
    purchasedSize: string;
    fit: string;
    activity: string;
  }>({
    rating: "all",
    size: "all",
    width: "all",
    purchasedSize: "all",
    fit: "all",
    activity: "all",
  });
  const [searchInput, setSearchInput] = useState("");
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

    setFilters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const sortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortSelectEl = e.target as HTMLSelectElement;
    if (sortSelectEl.value === "newest") {
      setShownReviews([
        ...MockData.sort((b, a) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 0;
          }
        }),
      ]);
    } else if (sortSelectEl.value === "oldest") {
      setShownReviews([
        ...MockData.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 0;
          }
        }),
      ]);
    } else if (sortSelectEl.value === "highest-rated") {
      setShownReviews([...MockData.sort((a, b) => b.stars - a.stars)]);
    } else if (sortSelectEl.value === "lowest-rated") {
      setShownReviews([...MockData.sort((a, b) => a.stars - b.stars)]);
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
    setFilters({
      rating: "all",
      size: "all",
      width: "all",
      purchasedSize: "all",
      fit: "all",
      activity: "all",
    });
  };

  // Filtering the results according to the filters selected before rendering them
  const filteredArr = shownReviews
    .filter((review) => {
      if (filters.rating === "all") return review;
      return review.stars === +filters.rating;
    })
    .filter((review) => {
      if (filters.size === "all") return review;
      return review.size === +filters.size;
    })
    .filter((review) => {
      if (filters.purchasedSize === "all") return review;
      return review.purchasedSize === +filters.purchasedSize;
    })
    .filter((review) => {
      if (filters.width === "all") return review;
      return (
        review.width.toLocaleLowerCase() === filters.width.toLocaleLowerCase()
      );
    })
    .filter((review) => {
      if (filters.fit === "all") return review;
      return review.fit
        .toLocaleLowerCase()
        .includes(filters.fit.toLocaleLowerCase());
    })
    .filter((review) => {
      if (filters.activity === "all") return review;
      return review.activity
        .toLocaleLowerCase()
        .includes(filters.activity.toLocaleLowerCase());
    })
    .filter((review) => {
      if (!searchInput) return review;
      return review.msg
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });
  ////////////////////////////////////////////////////////
  let pages = [];

  for (let i = 1; i <= filteredArr.length / 3; i++) {
    pages.push(
      <Link href="#" key={i}>
        <p>{i}</p>
      </Link>
    );
  }

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
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
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
            <select id="sort" name="sort" onChange={sortChangeHandler}>
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
              <option value="5">★★★★★</option>
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
              name="purchasedSize"
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
          <p>{filteredArr.length} Reviews</p>
          <button
            type="button"
            ref={clearFiltersBtnRef}
            onClick={clearFiltersHandler}
          >
            Clear All Filters
          </button>
        </div>
        <div className={classes["reviews"]}>
          {filteredArr.map((review, i) => (
            <Review
              key={i}
              name={review.name}
              isVerified={review.isVerified}
              size={review.size}
              width={review.width}
              purchasedSize={review.purchasedSize}
              fit={review.fit}
              activity={review.activity}
              stars={review.stars}
              header={review.header}
              msg={review.msg}
              date={review.date}
            />
          ))}
        </div>
        <div className={classes.pages}>
          <Link href="#">
            <span className="chevron chevron-left"></span>
          </Link>
          {pages.map((page) => page)}
          <Link href="#">
            <span className="chevron chevron-right"></span>
          </Link>
        </div>
      </div>
    </>
  );
}

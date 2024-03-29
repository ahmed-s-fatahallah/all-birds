"use client";
import Link from "next/link";
import classes from "./ProductReviews.module.css";
import Image from "next/image";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Review from "./Review/Review";
import { MockDataReviews } from "@/utilities/MockData";

export default function ProductReviews() {
  const [shownReviews, setShownReviews] = useState(
    MockDataReviews.sort((b, a) => {
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
  const [currentPage, setCurrentPage] = useState(0);
  const clearFiltersBtnRef = useRef<HTMLButtonElement>(null);
  const formElRef = useRef<HTMLFormElement>(null);
  const pagesContainerRef = useRef<HTMLDivElement>(null);
  const reviewsListRef = useRef<HTMLDivElement>(null);

  const filterValueChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectEl = (e.target as HTMLSelectElement)!;

    if (selectEl.value === "all") {
      selectEl.style.color = "transparent";
      selectEl.parentElement
        ?.querySelector("button")
        ?.classList.remove(`${classes.shown}`);
    } else {
      selectEl.style.color = "inherit";
      selectEl.parentElement
        ?.querySelector("button")
        ?.classList.add(`${classes.shown}`);
    }

    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortSelectEl = e.target as HTMLSelectElement;
    if (sortSelectEl.value === "newest") {
      setShownReviews([
        ...MockDataReviews.sort((b, a) => {
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
        ...MockDataReviews.sort((a, b) => {
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
      setShownReviews([...MockDataReviews.sort((a, b) => b.stars - a.stars)]);
    } else if (sortSelectEl.value === "lowest-rated") {
      setShownReviews([...MockDataReviews.sort((a, b) => a.stars - b.stars)]);
    }
    setCurrentPage(0);
  };

  const clearFiltersHandler = () => {
    if (!formElRef.current || !clearFiltersBtnRef.current) return;
    const selectElsArr: HTMLSelectElement[] = Array.from(
      formElRef.current.querySelectorAll("select:not(#sort)")
    );
    const clearFilterBtnEls = Array.from(
      formElRef.current.querySelectorAll("select ~ button")
    );
    selectElsArr.forEach((el) => {
      el.value = "all";
      el.style.color = "transparent";
    });
    clearFilterBtnEls.forEach((el) => {
      el.classList.remove(`${classes.shown}`);
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

  const clearFilterBtnHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonEl = (e.target as HTMLElement).closest("button")!;
    const selectEl = buttonEl.parentElement?.querySelector("select")!;
    buttonEl.classList.remove(`${classes.shown}`);
    selectEl.value = "all";
    selectEl.style.color = "transparent";
    setFilters((prev) => ({ ...prev, [selectEl.name]: "all" }));
  };

  const inputBoxHandler = (e: MouseEvent | FocusEvent | KeyboardEvent) => {
    let inputBoxEl;

    if (e.type === "click") {
      inputBoxEl = (
        e.currentTarget as HTMLButtonElement
      ).parentElement!.querySelector<HTMLInputElement>("input")!;
      if (!inputBoxEl.value.trim()) {
        setSearchInput(inputBoxEl.value.trim());
      } else {
        inputBoxEl.value = "";
        setSearchInput("");
      }
    } else if (
      (e.type === "keydown" && "key" in e && e.key === "Enter") ||
      e.type === "blur"
    ) {
      inputBoxEl = e.target as HTMLInputElement;
      setSearchInput(inputBoxEl.value.trim());
    }
  };

  useEffect(() => {
    if (!formElRef.current || !clearFiltersBtnRef.current) return;
    const selectElsArr: HTMLSelectElement[] = Array.from(
      formElRef.current.querySelectorAll("select:not(#sort)")
    );

    if (selectElsArr.some((el) => el.value !== "all")) {
      clearFiltersBtnRef.current.style.display = "block";
    } else {
      clearFiltersBtnRef.current.style.display = "none";
    }

    setCurrentPage(0);
  }, [filters]);

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
  let renderedReviews = [];

  for (let i = currentPage * 3; i < currentPage * 3 + 3; i++) {
    if (!filteredArr[i]) break;
    renderedReviews.push(filteredArr[i]);
  }

  for (let i = 1; i <= Math.ceil(filteredArr.length / 3); i++) {
    pages.push(
      <Link
        className={`${i === currentPage + 1 && classes.active}`}
        href="#"
        key={i}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(i - 1);
          reviewsListRef.current?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <p>{i}</p>
      </Link>
    );
  }
  //IMPLEMENT SMALL X BUTTONS NEXT TO EACH FILTER
  return (
    <>
      <form
        className={classes["reviews-filters"]}
        ref={formElRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={classes["search-box"]}>
          <label htmlFor="search">Search</label>
          <div>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Enter Search Term"
              onBlur={inputBoxHandler}
              onKeyDown={inputBoxHandler}
            />
            <button type="button" onClick={inputBoxHandler}>
              {!searchInput ? (
                <Image
                  draggable={false}
                  src="//cdn.allbirds.com/image/upload/v1630526687/icons/search-fixed.svg"
                  alt="magnifying glass"
                  width={11}
                  height={11}
                />
              ) : (
                <span></span>
              )}
            </button>
          </div>
        </div>
        <div className={classes["sort-box"]}>
          <label htmlFor="sort">Sort by</label>
          <div>
            <select
              id="sort"
              name="sort"
              defaultValue="newest"
              onChange={sortChangeHandler}
            >
              <option value="newest">Newest</option>
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
            <select
              id="rating"
              name="rating"
              defaultValue="all"
              onChange={filterValueChangeHandler}
            >
              <option value="all">All</option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="5">★★★★★</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["size-box"]}>
          <label htmlFor="size">Typical Size</label>
          <div>
            <select
              id="size"
              name="size"
              defaultValue="all"
              onChange={filterValueChangeHandler}
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
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["width-box"]}>
          <label htmlFor="width">Typical Width</label>
          <div>
            <select
              id="width"
              name="width"
              defaultValue="all"
              onChange={filterValueChangeHandler}
            >
              <option value="all">All</option>
              <option value="narrow">Narrow</option>
              <option value="average">Average</option>
              <option value="wide">Wide</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
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
              defaultValue="all"
              onChange={filterValueChangeHandler}
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
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["fit-box"]}>
          <label htmlFor="fit">Overall Fit</label>
          <div>
            <select
              id="fit"
              name="fit"
              defaultValue="all"
              onChange={filterValueChangeHandler}
            >
              <option value="all">All</option>
              <option value="small">Runs Small</option>
              <option value="right">Just Right</option>
              <option value="big">Runs Big</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
              <span></span>
            </button>
          </div>
        </div>
        <div className={classes["activity-box"]}>
          <label htmlFor="activity">Activity Level</label>
          <div>
            <select
              id="activity"
              name="activity"
              defaultValue="all"
              onChange={filterValueChangeHandler}
            >
              <option value="all">All</option>
              <option value="house">Around The House</option>
              <option value="walking">Walking</option>
              <option value="commuting">Commuting</option>
              <option value="errands">Running Errands</option>
              <option value="traveling">Traveling</option>
            </select>
            <div>
              <span className="chevron chevron-down"></span>
            </div>
            <button
              type="button"
              title="clear filter"
              onClick={clearFilterBtnHandler}
            >
              <span></span>
            </button>
          </div>
        </div>
      </form>
      <div className={classes["reviews-list"]} ref={reviewsListRef}>
        <div className={classes["reviews-list__header"]}>
          <p>{`${filteredArr.length} ${
            filteredArr.length <= 1 ? "Review" : "Reviews"
          }`}</p>
          <button
            type="button"
            ref={clearFiltersBtnRef}
            onClick={clearFiltersHandler}
          >
            Clear All Filters
          </button>
        </div>
        <div className={classes["reviews"]}>
          {renderedReviews.map((review, i) => (
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
          {currentPage > 0 && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => --prev);
                reviewsListRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span className="chevron chevron-left"></span>
            </Link>
          )}

          {pages.length <= 0 ? (
            <p className={classes["no-result-text"]}>
              Sorry, no reviews match your criteria.
            </p>
          ) : (
            <div className={classes["pages-container"]} ref={pagesContainerRef}>
              {pages.map((page) => page)}
            </div>
          )}
          {currentPage < Math.ceil(filteredArr.length / 3) - 1 && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((prev) => ++prev);
                reviewsListRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span className="chevron chevron-right"></span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

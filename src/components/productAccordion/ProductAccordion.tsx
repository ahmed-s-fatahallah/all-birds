"use client";
import { MouseEvent, useRef } from "react";
import classes from "./ProductAccordion.module.css";

export default function ProductAccordion({
  productDetails,
}: {
  productDetails: { title: string; description: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: MouseEvent) => {
    const targetButtonEl = (e.target as HTMLButtonElement).closest("button");
    const buttonArrowEl = targetButtonEl?.querySelector("span");

    if (
      targetButtonEl?.nextElementSibling?.classList.contains(
        `${classes.active}`
      )
    ) {
      buttonArrowEl?.classList.replace("chevron-up", "chevron-down");
      targetButtonEl?.nextElementSibling?.classList.remove(`${classes.active}`);
      return;
    }

    containerRef.current
      ?.querySelector(`.${classes.active}`)
      ?.classList.remove(`${classes.active}`);

    containerRef.current
      ?.querySelector(".chevron-up")
      ?.classList.replace("chevron-up", "chevron-down");

    buttonArrowEl?.classList.replace("chevron-down", "chevron-up");
    targetButtonEl?.nextElementSibling?.classList.add(`${classes.active}`);
  };

  return (
    <div className={classes.details} ref={containerRef}>
      {productDetails.map((detail, i) => (
        <div key={i}>
          <button type="button" onClick={clickHandler}>
            <p>{detail.title}</p>
            <span className={`chevron chevron-down`}></span>
          </button>
          <div className={`${classes.descriptionContainer} `}>
            <p>{detail.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
    const buttonArrowEl = (e.target as HTMLButtonElement)
      .closest("button")
      ?.querySelector("span");
    const descriptionEl = (e.target as HTMLDivElement)
      .closest("div")
      ?.querySelector(`.${classes.descriptionContainer}`);
    if (!descriptionEl || !containerRef.current) return;
    const height = descriptionEl.querySelector("p")?.clientHeight;

    Array.from(containerRef.current.children).forEach((el) => {
      if (
        el.querySelector(`.${classes.descriptionContainer}`) === descriptionEl
      )
        return;

      el.querySelector(`.${classes.descriptionContainer}`)?.removeAttribute(
        "style"
      );

      el.querySelector("span")?.classList.replace("chevron-up", "chevron-down");
    });

    if (buttonArrowEl?.classList.contains("chevron-down")) {
      buttonArrowEl?.classList.replace("chevron-down", "chevron-up");
      descriptionEl.setAttribute("style", `height: ${height}px`);
    } else {
      buttonArrowEl?.classList.replace("chevron-up", "chevron-down");
      descriptionEl.removeAttribute("style");
    }
  };

  return (
    <div className={classes.details} ref={containerRef}>
      {productDetails.map((detail, i) => (
        <div key={i}>
          <button type="button" onClick={clickHandler}>
            <p>{detail.title}</p>
            <span className={`chevron chevron-down`}></span>
          </button>
          <div className={`${classes.descriptionContainer}`}>
            <p>{detail.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

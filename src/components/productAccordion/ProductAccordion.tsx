"use client";
import { MouseEvent, useRef } from "react";
import classes from "./ProductAccordion.module.css";

export default function ProductAccordion({
  details,
  sustainability,
  care,
  shipping,
}: {
  details: {
    title: string;
    description: string;
    paragraphs: { title: string; content: string }[];
  };
  sustainability: {
    title: string;
    descriptions: string[];
    listHeader: string;
    ulListItems: string[];
  };
  care: {
    title: string;
    olListItems: string[];
    footer: string;
  };
  shipping: {
    title: string;
    paragraphs: string[];
  };
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
      <div>
        <button type="button" onClick={clickHandler}>
          <p>{details.title}</p>
          <span className={`chevron chevron-down`}></span>
        </button>
        <div className={`${classes.descriptionContainer} `}>
          <div>
            <p>{details.description}</p>
            {details.paragraphs.map((paragraph, i) => (
              <p key={i}>
                <b>{paragraph.title}</b>
                {paragraph.content}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button type="button" onClick={clickHandler}>
          <p>{sustainability.title}</p>
          <span className={`chevron chevron-down`}></span>
        </button>
        <div className={`${classes.descriptionContainer} `}>
          <div>
            {sustainability.descriptions.map((description, i) => (
              <p key={i}>{description}</p>
            ))}
            <p>
              <b>{sustainability.listHeader}</b>
            </p>
            <ul>
              {sustainability.ulListItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <button type="button" onClick={clickHandler}>
          <p>{care.title}</p>
          <span className={`chevron chevron-down`}></span>
        </button>
        <div className={`${classes.descriptionContainer} `}>
          <div>
            <ol>
              {care.olListItems.map((item, i) => (
                <li key={i}>
                  <p>{`${i + 1}. ${item}`}</p>
                </li>
              ))}
            </ol>
            <br />
            <p>{care.footer}</p>
          </div>
        </div>
      </div>
      <div>
        <button type="button" onClick={clickHandler}>
          <p>{shipping.title}</p>
          <span className={`chevron chevron-down`}></span>
        </button>
        <div className={`${classes.descriptionContainer} `}>
          <div>
            {shipping.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

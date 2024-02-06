"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./ProductPhotosCarousel.module.css";
import Image from "next/image";

export default function ProductPhotosCarousel({
  carouselImgsLinks,
}: {
  carouselImgsLinks: string[];
}) {
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLImageElement>(null);
  const imageContainerWidthRef = useRef(0);
  const remainingImagesCountRef = useRef(0);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const isHoldingRef = useRef(false);
  const currentClientXValueRef = useRef(0);
  const lastTranslateXRef = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [direction, setDirection] = useState<
    "left" | "left-double" | "right" | "right-double"
  >();

  useLayoutEffect(() => {
    if (!imageContainerRef.current || !sliderWrapperRef.current) return;
    imageContainerWidthRef.current = Number.parseFloat(
      getComputedStyle(imageContainerRef.current).width
    );
    remainingImagesCountRef.current =
      sliderWrapperRef.current.children.length -
      Math.round(
        sliderWrapperRef.current?.clientWidth / imageContainerWidthRef.current
      );
  });

  const clickHandler = (direction: string) => {
    if (!sliderWrapperRef.current) return;
    sliderWrapperRef.current.style.transitionDuration = "200ms";
    if (direction === "right") {
      setTranslateX((prev) => prev + imageContainerWidthRef.current);
    }

    if (direction === "left") {
      setTranslateX((prev) => prev - imageContainerWidthRef.current);
    }
  };

  const pointerHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!sliderWrapperRef.current) return;
    if (e.type === "pointerdown") {
      if ((e.target as HTMLDivElement).closest(`.${classes.slider}`)) {
        isHoldingRef.current = true;
        currentClientXValueRef.current = e.clientX;
      }
    }

    if (e.type === "pointerup" || e.type === "pointerleave") {
      if (e.pointerType === "touch" && e.type === "pointerup") return;
      if (!sliderWrapperRef.current) return;
      isHoldingRef.current = false;
      sliderWrapperRef.current.style.transitionDuration = "200ms";
      if (translateX <= 0) {
        setTranslateX(0);
      } else if (
        translateX >=
        imageContainerWidthRef.current * remainingImagesCountRef.current
      ) {
        setTranslateX(
          imageContainerWidthRef.current * remainingImagesCountRef.current
        );
      } else {
        if (direction === "left") {
          setTranslateX(
            lastTranslateXRef.current + imageContainerWidthRef.current
          );
        } else if (direction === "left-double") {
          setTranslateX(
            lastTranslateXRef.current + imageContainerWidthRef.current * 2
          );
        } else if (direction === "right") {
          setTranslateX(
            lastTranslateXRef.current - imageContainerWidthRef.current
          );
        } else if (direction === "right-double") {
          setTranslateX(
            lastTranslateXRef.current - imageContainerWidthRef.current * 2
          );
        } else {
          setTranslateX(lastTranslateXRef.current);
        }
        setDirection(undefined);
      }
    }
  };

  const pointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!sliderWrapperRef.current) return;
    const sliderWrapper = sliderWrapperRef.current;
    if (isHoldingRef.current) {
      sliderWrapper.style.transitionDuration = "0ms";
      if (currentClientXValueRef.current > e.clientX) {
        setTranslateX(
          lastTranslateXRef.current + currentClientXValueRef.current - e.clientX
        );
        if (
          currentClientXValueRef.current - e.clientX >=
          imageContainerWidthRef.current * 1.5
        ) {
          setDirection("left-double");
        } else if (
          currentClientXValueRef.current - e.clientX >=
          imageContainerWidthRef.current / 2
        ) {
          setDirection("left");
        } else {
          setDirection(undefined);
        }
      }

      if (currentClientXValueRef.current < e.clientX) {
        setTranslateX(
          currentClientXValueRef.current - e.clientX + lastTranslateXRef.current
        );

        if (
          e.clientX - currentClientXValueRef.current >=
          imageContainerWidthRef.current * 1.5
        ) {
          setDirection("right-double");
        } else if (
          e.clientX - currentClientXValueRef.current >=
          imageContainerWidthRef.current / 2
        ) {
          setDirection("right");
        } else {
          setDirection(undefined);
        }
      }
    }
  };

  useEffect(() => {
    if (
      !leftButtonRef.current ||
      !rightButtonRef.current ||
      !sliderWrapperRef.current
    )
      return;
    const sliderWrapper = sliderWrapperRef.current;
    if (translateX <= 0) {
      leftButtonRef.current.style.display = "none";
    } else {
      leftButtonRef.current.style.display = "flex";
    }

    if (
      translateX >=
      imageContainerWidthRef.current * remainingImagesCountRef.current
    ) {
      rightButtonRef.current.style.display = "none";
    } else {
      rightButtonRef.current.style.display = "flex";
    }

    const transitionEndHandler = () => {
      lastTranslateXRef.current = translateX;
    };

    sliderWrapper.addEventListener("transitionend", transitionEndHandler);
    return () => {
      sliderWrapper.removeEventListener("transitionend", transitionEndHandler);
    };
  }, [translateX]);

  return (
    <div className={classes["product-carousel"]}>
      <p>Worn In The Wild</p>
      <div className={classes["slider-container"]}>
        <div
          ref={sliderWrapperRef}
          className={classes.slider}
          style={{
            translate: `${-translateX}px  0`,
            transitionProperty: "all",
            transitionTimingFunction: "ease-in-out",
          }}
          onPointerDown={pointerHandler}
          onPointerUp={pointerHandler}
          onPointerLeave={pointerHandler}
          onPointerMove={pointerMoveHandler}
        >
          {carouselImgsLinks.map((link, i) => (
            <div key={i} ref={imageContainerRef}>
              <Image
                src={link}
                alt="display Image"
                width={345.333}
                height={370}
              />
            </div>
          ))}
        </div>
        <button
          ref={leftButtonRef}
          type="button"
          className={classes["slider-btn"]}
          title="Left Arrow button"
          onClick={clickHandler.bind(null, "left")}
        >
          <span className="chevron chevron-left"></span>
        </button>
        <button
          ref={rightButtonRef}
          type="button"
          className={classes["slider-btn"]}
          title="Right arrow button"
          onClick={clickHandler.bind(null, "right")}
        >
          <span className="chevron chevron-right"></span>
        </button>
      </div>
    </div>
  );
}

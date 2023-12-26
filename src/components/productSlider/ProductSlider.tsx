"use client";

import { Color } from "@/definitions";
import classes from "./ProductSlider.module.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ProductSlider({
  productColors,
  productVideo,
  productDisplayImg,
  productVidThumbnail,
}: {
  productColors: Color[];
  productVideo: string;
  productDisplayImg: string;
  productVidThumbnail: string;
}) {
  const finalProductArrRef = useRef<string[]>([]);
  const imagesWrapperRef = useRef<HTMLUListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isHoldingRef = useRef(false);
  const currentClientXValueRef = useRef(0);
  const [currentImg, setCurrentImg] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [direction, setDirection] = useState<
    "left" | "left-double" | "right" | "right-double"
  >();

  finalProductArrRef.current = productColors[0].imgs
    .toSpliced(2, 0, productDisplayImg)
    .toSpliced(4, 0, productVidThumbnail);

  let images = finalProductArrRef.current.map((el, i) => {
    if (i === 4) {
      return (
        <li key={i}>
          <video
            ref={videoRef}
            width={631}
            height={631}
            preload="auto"
            autoPlay
            loop
            playsInline
            webkit-playsinline
            x5-playsinline
          >
            <source src={productVideo} type="video/mp4" />
          </video>
        </li>
      );
    }
    return (
      <li key={i}>
        <Image
          draggable={false}
          src={el}
          alt="product image"
          width={631}
          height={631}
        />
      </li>
    );
  });

  useLayoutEffect(() => {
    if (!imagesWrapperRef.current?.clientWidth) return;
    setTranslateX(imagesWrapperRef.current?.clientWidth * currentImg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const holdingHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!imagesWrapperRef.current) return;
    const imagesWrapper = imagesWrapperRef.current;

    if (e.type === "pointerdown") {
      if (
        (e.target as HTMLDivElement).closest(
          `.${classes["main-img-container"]}`
        )
      ) {
        isHoldingRef.current = true;
        currentClientXValueRef.current = e.clientX;
        imagesWrapper.style.cursor = "grabbing";
      }
    }

    if (e.type === "pointerup" || e.type === "pointerleave") {
      if (e.pointerType === "touch" && e.type === "pointerup") return;

      isHoldingRef.current = false;

      imagesWrapper.style.cursor = "grab";
      if (direction === "left") {
        setCurrentImg((prev) => ++prev);
      } else if (direction === "left-double") {
        setCurrentImg((prev) => (prev += 2));
      } else if (direction === "right") {
        setCurrentImg((prev) => --prev);
      } else if (direction === "right-double") {
        setCurrentImg((prev) => (prev -= 2));
      } else {
        setTranslateX(imagesWrapper.clientWidth * currentImg);
      }
    }
  };

  const pointerMoveHandler = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!imagesWrapperRef.current) return;
    const imagesWrapper = imagesWrapperRef.current;
    if (isHoldingRef.current) {
      imagesWrapper.style.transitionDuration = "0ms";
      if (currentClientXValueRef.current > e.clientX) {
        setTranslateX(
          imagesWrapper.clientWidth * currentImg +
            (currentClientXValueRef.current - e.clientX)
        );
        if (
          Math.ceil(
            (currentClientXValueRef.current - 20 - e.clientX) /
              imagesWrapper.clientWidth
          ) >= 2
        ) {
          setDirection("left-double");
        } else if (currentClientXValueRef.current - e.clientX >= 20) {
          setDirection("left");
        }
      }
      if (currentClientXValueRef.current < e.clientX) {
        setTranslateX(
          imagesWrapper.clientWidth * currentImg -
            (e.clientX - currentClientXValueRef.current)
        );
        if (
          Math.floor(
            (currentClientXValueRef.current + 20 - e.clientX) /
              imagesWrapper.clientWidth
          ) <= -2
        ) {
          setDirection("right-double");
        } else if (currentClientXValueRef.current - e.clientX <= -20) {
          setDirection("right");
        }
      }

      if (
        e.target === imagesWrapper.firstElementChild?.firstElementChild ||
        e.target === imagesWrapper.lastElementChild?.firstElementChild
      ) {
        if (currentImg < 1) {
          setCurrentImg(finalProductArrRef.current.length);
          setTranslateX(
            imagesWrapper.clientWidth * finalProductArrRef.current.length
          );
          return;
        }

        if (currentImg > finalProductArrRef.current.length) {
          setCurrentImg(1);
          setTranslateX(imagesWrapper.clientWidth);
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (!imagesWrapperRef.current) return;
    const imagesWrapper = imagesWrapperRef.current;
    setTranslateX(imagesWrapper.clientWidth * currentImg);
    setDirection(undefined);
    if (videoRef.current?.paused) videoRef.current?.play();

    const transitionEnd = () => {
      imagesWrapper.style.transitionDuration = "0ms";
      if (currentImg < 1) {
        setCurrentImg(finalProductArrRef.current.length);
        setTranslateX(
          imagesWrapper.clientWidth * finalProductArrRef.current.length
        );
        return;
      }

      if (currentImg > finalProductArrRef.current.length) {
        setCurrentImg(1);
        setTranslateX(imagesWrapper.clientWidth);
        return;
      }
    };
    imagesWrapper.style.transitionDuration = "200ms";

    imagesWrapper.addEventListener("transitionend", transitionEnd);

    return () => {
      imagesWrapper.removeEventListener("transitionend", transitionEnd);
    };
  }, [currentImg]);

  const sliderBtnClickHandler = (direction: string) => {
    if (!imagesWrapperRef.current) return;
    if (direction === "left") {
      if (currentImg === 1) {
        setCurrentImg(finalProductArrRef.current.length);
      } else {
        setCurrentImg((prev) => --prev);
      }
    } else if (direction === "right") {
      if (currentImg === finalProductArrRef.current.length) {
        setCurrentImg(1);
      } else {
        setCurrentImg((prev) => ++prev);
      }
    }
  };

  return (
    <>
      <div className={classes.slider}>
        {finalProductArrRef.current.map((el, i) => (
          <button
            type="button"
            key={i}
            className={`${currentImg - 1 === i && classes.active}`}
            onClick={() => {
              setCurrentImg(i + 1);
            }}
          >
            <Image
              draggable={false}
              src={el}
              alt="product image"
              width={66}
              height={66}
            />
          </button>
        ))}
      </div>
      <div
        className={classes["main-img-container"]}
        onPointerDown={holdingHandler}
        onPointerUp={holdingHandler}
        onPointerLeave={holdingHandler}
        onPointerMove={pointerMoveHandler}
      >
        <ul
          className={classes["main-img-slider-wrapper"]}
          ref={imagesWrapperRef}
          style={{
            transform: `translateX(${-translateX}px)`,
            transitionProperty: "all",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <li key={finalProductArrRef.current.length + 1}>
            <Image
              draggable={false}
              src={
                finalProductArrRef.current[
                  finalProductArrRef.current.length - 1
                ]
              }
              alt="product image"
              width={631}
              height={631}
            />
          </li>
          {...images}
          <li key={finalProductArrRef.current.length + 2}>
            <Image
              draggable={false}
              src={finalProductArrRef.current[0]}
              alt="product image"
              width={631}
              height={631}
            />
          </li>
        </ul>

        <div className={classes.arrows}>
          <button
            type="button"
            title="left arrow"
            onClick={sliderBtnClickHandler.bind(null, "left")}
          >
            <span className="chevron chevron-left"></span>
          </button>
          <button
            type="button"
            title="right arrow"
            onClick={sliderBtnClickHandler.bind(null, "right")}
          >
            <span className="chevron chevron-right"></span>
          </button>
        </div>
      </div>
    </>
  );
}

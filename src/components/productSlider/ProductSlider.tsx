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
  const imagesWrapperRef = useRef<HTMLUListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentImg, setCurrentImg] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  useLayoutEffect(() => {
    if (!imagesWrapperRef.current?.clientWidth) return;
    setTranslateX(imagesWrapperRef.current?.clientWidth * currentImg);
  }, []);

  const finalProductArr = productColors[0].imgs
    .toSpliced(2, 0, productDisplayImg)
    .toSpliced(4, 0, productVidThumbnail);

  let images = finalProductArr.map((el, i) => {
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

  useEffect(() => {
    const transitionEnd = () => {
      if (!imagesWrapperRef.current) return;
      if (currentImg <= 1) {
        imagesWrapperRef.current.style.transitionDuration = "0ms";
        setTranslateX(imagesWrapperRef.current?.clientWidth * currentImg);
      }

      if (currentImg >= finalProductArr.length) {
        imagesWrapperRef.current.style.transition = "0ms";
        setTranslateX(
          imagesWrapperRef.current?.clientWidth * finalProductArr.length
        );
      }
    };
    videoRef.current?.play();
    document.addEventListener("transitionend", transitionEnd);

    return () => {
      document.removeEventListener("transitionend", transitionEnd);
    };
  }, [currentImg, finalProductArr]);

  const sliderBtnClickHandler = (direction: string) => {
    if (!imagesWrapperRef.current) return;
    imagesWrapperRef.current.style.transitionDuration = "200ms";
    if (direction === "left") {
      if (currentImg <= 1) {
        setTranslateX(0);
        setCurrentImg(finalProductArr.length);
      } else {
        if (!imagesWrapperRef.current?.clientWidth) return;
        setTranslateX(imagesWrapperRef.current?.clientWidth * (currentImg - 1));
        setCurrentImg((prev) => --prev);
      }
    } else if (direction === "right") {
      if (!imagesWrapperRef.current?.clientWidth) return;
      if (currentImg >= finalProductArr.length) {
        setTranslateX(
          imagesWrapperRef.current?.clientWidth * (finalProductArr.length + 1)
        );
        setCurrentImg(1);
      } else {
        setTranslateX(imagesWrapperRef.current?.clientWidth * (currentImg + 1));
        setCurrentImg((prev) => ++prev);
      }
    }
  };

  return (
    <>
      <div className={classes.slider}>
        {finalProductArr.map((el, i) => (
          <button
            type="button"
            key={i}
            className={`${currentImg - 1 === i && classes.active}`}
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
      <div className={classes["main-img-container"]}>
        <ul
          className={classes["main-img-slider-wrapper"]}
          ref={imagesWrapperRef}
          style={{
            transform: `translateX(${-translateX}px)`,
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <li key={finalProductArr.length + 1}>
            <Image
              draggable={false}
              src={finalProductArr[finalProductArr.length - 1]}
              alt="product image"
              width={631}
              height={631}
            />
          </li>
          {...images}
          <li key={finalProductArr.length + 2}>
            <Image
              draggable={false}
              src={finalProductArr[0]}
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

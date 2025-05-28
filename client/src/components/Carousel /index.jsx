import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import classNames from "classnames";

const images = [
  {
    url: "/images/one.png",
    title: "One",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: 0,
  },
  {
    url: "/images/two.jpg",
    title: "Two",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: 1,
  },
  {
    url: "/images/three.png",
    title: "Three",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: 2,
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const clearAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const nextSlide = () => {
    clearAutoScroll();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    clearAutoScroll()
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    console.log("intervalRef.current", intervalRef.current)

    return () => clearAutoScroll();
  }, []);

  const lButton = classNames(styles.carousel__button, styles.left);
  const rButton = classNames(styles.carousel__button, styles.right);

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__wrapper}>
        <div className={styles.carousel__slide}>
          <img
            src={images[current].url}
            alt={images[current].title}
            className={styles.carousel__image}
          />
          <div className={styles.carousel__text}>
            <h2>{images[current].title}</h2>
            <p>{images[current].text}</p>
          </div>
          <button className={lButton} onClick={prevSlide}>
            ❮
          </button>
          <button className={rButton} onClick={nextSlide}>
            ❯
          </button>
        </div>
      </div>

      <div className={styles.carousel__dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={classNames(styles.dot, {
              [styles.active]: index === current,
            })}
            onClick={() => {
              clearAutoScroll();
              setCurrent(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

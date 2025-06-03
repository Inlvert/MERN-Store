import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import classNames from "classnames";

const images = [
  {
    url: "/images/Rectangle 6.png",
    title: "FIND CLOTHES THAT MATCHES YOUR STYLE",
    text: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    id: 0,
    buttonText: "By now",
    buttonUrl: "/login",
  },
  {
    url: "/images/Rectangle 7.png",
    title: "2FIND CLOTHES THAT MATCHES YOUR STYLE",
    text: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    id: 1,
    buttonText: "By now",
    buttonUrl: "/login",
  },
  {
    url: "/images/Rectangle 5.png",
    title: "3FIND CLOTHES THAT MATCHES YOUR STYLE",
    text: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    id: 2,
    buttonText: "By now",
    buttonUrl: "/login",
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
    clearAutoScroll();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    console.log("intervalRef.current", intervalRef.current);

    return () => clearAutoScroll();
  }, []);

  const lButton = classNames(styles.carousel__button, styles.left);
  const rButton = classNames(styles.carousel__button, styles.right);

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__wrapper}>
        <div className={styles.carousel__slide}>
          
          <div className={styles.carousel__text}>
            <h2>{images[current].title}</h2>
            <p>{images[current].text}</p>
            <button
              onClick={() => (window.location.href = images[current].buttonUrl)}
            >
              {images[current].buttonText}
            </button>
          </div>
          <button className={lButton} onClick={prevSlide}>
            ❮
          </button>
          <button className={rButton} onClick={nextSlide}>
            ❯
          </button>
          <img
            src={images[current].url}
            alt={images[current].title}
            className={styles.carousel__image}
          />
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

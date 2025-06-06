import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import images from "./images";
import { NavLink } from "react-router";

const Carousel = () => {
  const { theme } = useSelector((state) => state.theme);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  console.log(theme);

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

  const themeClassLinkColor = classNames(styles.btn, {
    [styles.btnLight]: theme === "light",
    [styles.btnDark]: theme === "dark",
  });

  console.log(images[current].buttonUrl);

  return (
    <div className={styles.cover}>
      <div className={styles.slide}>
        <div className={styles.text}>
          <h2>{images[current].title}</h2>
          <p>{images[current].text}</p>
          <NavLink to="/login" end className={themeClassLinkColor}>
            {images[current].buttonText}
          </NavLink>
          <div className={styles.coverDivRelative}>
            <div className={styles.coverDiv}>
              <h1>200+</h1>
              <h5>International brends</h5>
            </div>
            <div className={styles.coverDiv}>
              <h1>2,000+</h1>
              <h5>High-Quality Products</h5>
            </div>
            <div className={styles.coverDiv}>
              <h1>30,000+</h1>
              <h5>Happy Customers</h5>
            </div>
          </div>
        </div>
        <div className={styles.coverImageButton}>
          <button
            onClick={prevSlide}
            className={classNames(styles.buttontArr, styles.left)}
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className={classNames(styles.buttontArr, styles.right)}
          >
            ❯
          </button>
          <img
            src={images[current].url}
            alt={images[current].title}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.dots}>
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

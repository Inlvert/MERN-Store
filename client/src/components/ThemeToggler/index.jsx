import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import styles from "./ThemeToggler.module.scss";

function ThemeToggler() {
  const dispatch = useDispatch();

  return (
    <>
      <label className={styles.toggle}>
        <input type="checkbox" onClick={() => dispatch(toggleTheme())}/>
        <span className={styles.slider}></span>
      </label>
    </>
  );
}

export default ThemeToggler;

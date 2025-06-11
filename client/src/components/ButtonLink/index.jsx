import React from "react";
import { NavLink } from "react-router";
import classNames from "classnames";
import styles from "./ButtonLink.module.scss";
import { useSelector } from "react-redux";

const ButtonLink = ({ text, link }) => {
  const { theme } = useSelector((state) => state.theme);

  const themeClassLinkColor = classNames(styles.btn, {
    [styles.btnLight]: theme === "light",
    [styles.btnDark]: theme === "dark",
  });

  return (
    <div className={styles.cover}>
      <NavLink to={link} end className={themeClassLinkColor}>
        {text}
      </NavLink>
    </div>
  );
};

export default ButtonLink;

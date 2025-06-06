import React from "react";
import styles from "./BrandaLine.module.scss";
import { ReactComponent as Zara } from "../../assets/svgLogo/zara.svg";
import { ReactComponent as Gucci } from "../../assets/svgLogo/gucci.svg";
import { ReactComponent as Mango } from "../../assets/svgLogo/mango.svg";
import { ReactComponent as CalvinKlein } from "../../assets/svgLogo/calvinKlein.svg";
import { ReactComponent as Prada } from "../../assets/svgLogo/prada.svg";
import { useSelector } from "react-redux";
import classNames from "classnames";

const BrandaLine = () => {
  const { theme } = useSelector((state) => state.theme);

  const colorLine = classNames(styles.line, {
    [styles.lineLight]: theme === "light",
    [styles.lineDark]: theme === "dark",
  });

  return (
    <div className={colorLine}>
      <Zara className={styles.logoSvg} />
      <Gucci className={styles.logoSvg} />
      <Prada className={styles.logoSvg} />
      <CalvinKlein className={styles.logoSvg} />
      <Mango className={styles.logoSvg} />
    </div>
  );
};

export default BrandaLine;

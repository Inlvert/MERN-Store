import React, { useState } from "react";
import styles from './Burger.module.scss'
import classNames from 'classnames'

function Burger(props) {
  
  const {isMenuOpen, setIsMenuOpen} = props
 
  const hendleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const cluoseBurger = classNames(styles.burgerLine, {
    [styles.clicked]: isMenuOpen,
    [styles.unclicked]: !isMenuOpen
  });

  console.log(isMenuOpen)
  
  return (
    <button className={styles.burger} onClick={hendleClick}>
      <div className={cluoseBurger}></div>
      <div className={cluoseBurger}></div>
      <div className={cluoseBurger}></div>
    </button>
  );
}

export default Burger;

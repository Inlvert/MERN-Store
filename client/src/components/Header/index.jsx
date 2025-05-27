import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";
import style from "./Header.module.scss";
import Burger from "../Burger";
import classNames from "classnames";
import ThemeToggler from "../ThemeToggler";
import { ReactComponent as CartIcon } from "../../assets/svg/cart.svg";


function Header(props) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  console.log(theme);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themeClassBackground = classNames(style.headerCover, {
    [style.light]: theme === "light",
    [style.dark]: theme === "dark",
  });

  const themeClassLinkColor = classNames(style.navLink, {
    [style.navLinkLight]: theme === "light",
    [style.navLinkDark]: theme === "dark",
  });

  const themeClassGreetingColor = classNames({
    [style.greetingLight]: theme === "light",
    [style.greetingDark]: theme === "dark",
  });

  const menuClass = classNames(style.navItem, {
    [style.hiddenDisplay]: isMenuOpen,
  });

  const themeClasshiddenDisplayColor = classNames({
    [style.hiddenDisplayLight]: theme === "light",
    [style.hiddenDisplayDark]: theme === "dark",
  });

  const mixClass = classNames(menuClass, themeClasshiddenDisplayColor)

  const hendleLogut = () => {
    clearToken();
    dispatch(logout());
  };

  return (
    <header className={themeClassBackground}>
      <nav className={style.nav}>
        <a href="/" className={themeClassLinkColor}>
          <h3>Store</h3>
        </a>
        <ul className={mixClass}>
          <li>
            <ThemeToggler />
          </li>
          <li>
            <NavLink to="/" end className={themeClassLinkColor}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" end className={themeClassLinkColor}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/registration" end className={themeClassLinkColor}>
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" end className={themeClassLinkColor}>
              Admin
            </NavLink>
          </li>
          <li>
            <span className={themeClassGreetingColor}>
              Hello {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </span>
          </li>
          <li>
            <button onClick={hendleLogut}>Logout</button>
          </li>
          <li>
            <NavLink to="/users" end className={themeClassLinkColor}>
              Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" end className={themeClassLinkColor}>
              <CartIcon className={themeClassLinkColor}/>
            </NavLink>
          </li>
          
        </ul>
        <Burger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
    </header>
  );
}

export default Header;

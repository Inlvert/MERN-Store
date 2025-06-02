import React, { useState } from "react";
import { NavLink } from "react-router"; // правильний імпорт
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";
import classNames from "classnames";
import Burger from "../Burger";
import ThemeToggler from "../ThemeToggler";
import { ReactComponent as CartIcon } from "../../assets/svg/shopping-cart.svg";
import { ReactComponent as UserIcon } from "../../assets/svg/user.svg";
import { ReactComponent as LogoutIcon } from "../../assets/svg/logout.svg";
import styles from "./Header2.module.scss";

function Header2() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const handleLogout = () => {
    clearToken();
    dispatch(logout());
  };

  const headerBgColor = classNames(styles.header, {
    [styles.light]: theme === "light",
    [styles.dark]: theme === "dark",
  });

  const logoColor = classNames(styles.logo, {
    [styles.light]: theme === "light",
    [styles.dark]: theme === "dark",
  });

  const linkColor = classNames(styles.link, {
    [styles.linkLight]: theme === "light",
    [styles.linkDark]: theme === "dark",
  });

  const iconColor = classNames(styles.icon, {
    [styles.linkLight]: theme === "light",
    [styles.linkDark]: theme === "dark",
  })

  const menuClasses = classNames(styles.menu, {
    [styles.menuOpen]: isMenuOpen,
  });

  return (
    <header className={headerBgColor}>
      <nav className={styles.nav}>
        <NavLink to="/" className={logoColor}>
          Store
        </NavLink>

        <Burger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <ul className={menuClasses}>
          <li>
            <ThemeToggler />
          </li>
          <li>
            <NavLink to="/" className={linkColor}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={linkColor}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/registration" className={linkColor}>
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={linkColor}>
              Admin
            </NavLink>
          </li>
          <li>
            <span>
              Hello {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </span>
          </li>
          <li>
            <NavLink className={linkColor} onClick={handleLogout}>
              <LogoutIcon className={iconColor} title="Logout"/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={linkColor}>
              <UserIcon className={iconColor} title="My Page"/>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={linkColor} >
              <CartIcon className={iconColor} title="My Cart" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header2;

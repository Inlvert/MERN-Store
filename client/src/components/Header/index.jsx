import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";
import style from "./Header.module.scss";
import Burger from "../Burger";
import classNames from "classnames";

function Header(props) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClass = classNames(style.navItem, {
    [style.hiddenDisplay]: isMenuOpen,
  });

  const hendleLogout = () => {
    clearToken();
    dispatch(logout());
  };

  return (
    <header className={style.headerCover}>
      <nav className={style.nav}>
        <a href="/" className={style.navLink}>
          <h3>Store</h3>
        </a>
        <ul className={menuClass}>
          <li>
            <NavLink to="/" end className={style.navLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" end className={style.navLink}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/registration" end className={style.navLink}>
              Registration
            </NavLink>
          </li>
          <li>
            <span style={{ color: "white" }}>
              Hello {user ? `${user.firstName} ${user.lastName}` : "Guest"}
            </span>
          </li>
          <li>
            <button onClick={hendleLogout}>Logout</button>
          </li>
        </ul>
        <Burger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
    </header>
  );
}

export default Header;

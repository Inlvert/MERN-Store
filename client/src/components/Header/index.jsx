import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";
import style from "./Header.module.scss";
import Burger from "../Burger";


function Header(props) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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
        <Burger/>
        <ul className={style.navItem}>
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
        </ul>
        <span style={{ color: "white" }}>
          Hello {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </span>
        <button onClick={hendleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;

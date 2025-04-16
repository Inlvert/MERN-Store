import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearToken } from "../../api";

function Header(props) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const hendleLogout = () => {
    clearToken();
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" end>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/registration" end>
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

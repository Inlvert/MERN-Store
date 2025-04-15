import React from "react";
import { NavLink } from "react-router";

function Header(props) {
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
      </nav>
    </header>
  );
}

export default Header;

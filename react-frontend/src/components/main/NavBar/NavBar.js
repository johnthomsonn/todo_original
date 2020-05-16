import React from "react";
import NavBarCss from "./NavBar.css"
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md">
      <a className="navbar-brand">Todo</a>
      <ul className="nav nav-pills mr-auto">
        <li className="nav-item">
          <Link className="nav-link active" to={"/"}>
            Home
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            href="#"
          >
            Lists
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Home
            </a>
          </div>
        </li>
        </ul>
        <ul className="ml-auto nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Sign up
            </a>
          </li>
          <li className="nav-item justify-content-end">
            <a className="nav-link" href="#">
              Sign in
            </a>
          </li>
      </ul>
    </nav>
  );
};

export default NavBar;

import React from "react";
import "./NavBar.css";
import {Link, withRouter} from "react-router-dom";
import {isLoggedIn, signout,isLoggedInBasic} from "../../../auth/Auth";

const NavBar = (props) => {

let logged= false;

  return (
    <nav className="navbar navbar-expand-md">
      <span className="navbar-brand">Todo</span>
      <ul className="nav nav-pills mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
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

        {console.log(isLoggedInBasic())}



          {isLoggedInBasic() ? (<>
          <li className="nav-item">
            <button className="nav-link" onClick={() => signout(() => props.history.push("/"))}>
              Sign out
            </button>
          </li>
        </>) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to={"/signup"}>
                Sign up
              </Link>
            </li>
            <li className="nav-item justify-content-end">
              <Link className="nav-link" to={"/signin"}>
                Sign in
              </Link>
            </li>
          </>
        )  }
      </ul>
    </nav>
  );
};

export default NavBar;

import React, {useState, useEffect} from "react";
import "./NavBar.css";
import {Link, withRouter} from "react-router-dom";
import {isLoggedIn, signout,isLoggedInBasic} from "../../../auth/Auth";

const NavBar = (props) => {

const [isLogged, setIsLogged] = useState(false);
useEffect(() => {
  setIsLogged(isLoggedInBasic())
})
  return (
    <nav className="navbar navbar-expand-md">
      <span className="navbar-brand">Todo</span>
      <ul className="nav nav-pills mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
        </li>
        {isLogged && (<>
          <li className="nav-item">
          <Link className="nav-link" to={`/${JSON.parse(window.sessionStorage.getItem("user")).username}`}>
            Profile
          </Link>
        </li></>)}

      </ul>

      <ul className="ml-auto nav nav-pills">




          {isLogged ? (<>

          <li className="nav-item">
            <a className="nav-link"  onClick={() => signout(() => props.history.push("/"))}>
              Sign out
            </a>
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

import React, {useState} from "react";
import NavBar from "../main/NavBar/NavBar";
import "./Signup.css";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleChange = event => {};

  const handleSubmit = event => {
    event.preventDefault();
  };

  const style = {
    backgroundImage: `linear-gradient(0deg, #eddf91 2px, rgba(0, 150, 136, 0) 0),
    linear-gradient(0deg, rgba(0, 0, 0, 0.26) 1px, transparent 0)`
  };

  return (
    <>
      <NavBar />
      <div className="container sign-up-container">
        <div className="header">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-form-div ">
          <form className="signup-form " onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="usernameInput" class="bmd-label-floating">
                Username:
              </label>
              <input
                type="text"
                class="form-control"
                id="usernameInput"
                name="usernameInput"
                value={input.username}
                style={style}
              />
            </div>

            <div class="form-group">
              <label for="emailInput" class="bmd-label-floating">
                Email:
              </label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                name="emailInput"
                value={input.email}
                style={style}
              />
              <span class="bmd-help" style={{color: "yellow"}}>
                We'll never share your email with anyone else.
              </span>
            </div>

            <div class="form-group">
              <label for="passwordInput" class="bmd-label-floating">
                Password:
              </label>
              <input
                type="password"
                class="form-control"
                id="passwordInput"
                name="passwordInput"
                autocomplete="new-password"
                value={input.password}
                style={style}
              />
              <span class="bmd-help">Please use a unique password</span>
            </div>

            <div class="form-group">
              <label for="passwordInputConfirm" class="bmd-label-floating">
                Confirm Password:
              </label>
              <input
                type="password"
                class="form-control"
                id="passwordInputConfirm"
                name="passwordInputConfirm"
                autocomplete="new-password"
                value={input.confirm}
                style={style}
              />
            </div>

            <button type="submit" class="btn  btn-raised">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

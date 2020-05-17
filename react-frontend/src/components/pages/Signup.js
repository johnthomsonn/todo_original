import React, {useState,useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import "./Signup.css";
import {cleanInput} from '../../auth/Auth'

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [goodInput, setGoodInput] = useState(false);

  useEffect( () => {
    validateInput();
  }, [input])


  const handleChange = name => event => {
    const userIn = event.target.value;
    setInput({...input, [name] : userIn});
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert()
  };

  const validEmail = () => {
    return /.+@.+\..+/.test(input.email)
  }

  const validateInput = () => {
    const cleanUsername = cleanInput(input.username) && input.username.length > 0;
    setGoodInput(cleanUsername && validEmail()  && input.password.length >= 6 && input.password === input.confirm)

  }


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
                onChange={handleChange("username")}
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
                onChange={handleChange("email")}
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
                onChange={handleChange("password")}
                style={style}
              />
              <span class="bmd-help ml-3" > <span style={{color : (input.password.length >= 6 ? "green" : "red")}}>{`${input.password.length}  / 6`} </span></span>
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
                onChange={handleChange("confirm")}
                value={input.confirm}
                style={style}
              />
            </div>

            <button type="submit" class="btn  btn-raised" disabled={(!goodInput ? true : false)}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

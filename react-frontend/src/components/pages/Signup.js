import React, {useState,useEffect} from "react";
import {Redirect} from 'react-router-dom'
import NavBar from "../main/NavBar/NavBar";
import "./Signup.css";
import {cleanInput, validateEmail} from '../../auth/Auth'

const Signup = (props) => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    error : "",
    loading : false,
    redirect : false
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
    if(goodInput)
    {
      setInput({...input, error : ""})
      signUp();
    }
    else{
      setInput({...input, error : "Please ensure all fields are filled with valid input"})
    }
  };

  const signUp = () => {
    setInput({...input, loading : true})
    fetch("http://localhost:5000/auth/signup", {
      method : "POST",
      mode : 'cors',
      credentials : 'include',
      headers :{
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : input.username,
        email : input.email,
        password : input.password
      })
    }
  )
  .then( response => response.json())
  .then( data => {
    if(data.error )
    {
      setInput({...input, error : data.error})
    }
    else
    {
      if(typeof window !== "undefined"){
        window.sessionStorage.setItem("user", JSON.stringify(data.user))
        window.sessionStorage.setItem("status" , data.status)
        setInput({...input, redirect : true})
      }
    }
  }).catch(err => console.log(err))
  setInput({...input, loading : false})
  }


  const validateInput = () => {
    const cleanUsername = cleanInput(input.username) && input.username.length > 0;
    setGoodInput(cleanUsername && validateEmail(input.email)  && input.password.length >= 6 && input.password === input.confirm)
  }


  const style = {
    backgroundImage: `linear-gradient(0deg, #eddf91 2px, rgba(0, 150, 136, 0) 0),
    linear-gradient(0deg, rgba(0, 0, 0, 0.26) 1px, transparent 0)`
  };

  if(input.redirect)
  {
    const  username = JSON.parse(window.sessionStorage.getItem("user")).username;
    return <Redirect to={`/${username}`} />
  }

  const signupForm = () => {
    return (
      <div className="signup-form-div ">
        <form className="signup-form " onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput" className="bmd-label-floating">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              name="usernameInput"
              value={input.username}
              style={style}
              onChange={handleChange("username")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailInput" className="bmd-label-floating">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="emailInput"
              value={input.email}
              style={style}
              onChange={handleChange("email")}
            />
            <span className="bmd-help" style={{color: "yellow"}}>
              We'll never share your email with anyone else.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInput" className="bmd-label-floating">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="passwordInput"
              autoComplete="new-password"
              value={input.password}
              onChange={handleChange("password")}
              style={style}
            />
            <span className="bmd-help ml-3" > <span style={{color : (input.password.length >= 6 ? "green" : "red")}}>{`${input.password.length}  / 6`} </span></span>
          </div>

          <div className="form-group">
            <label htmlFor="passwordInputConfirm" className="bmd-label-floating">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInputConfirm"
              name="passwordInputConfirm"
              autoComplete="new-password"
              onChange={handleChange("confirm")}
              value={input.confirm}
              style={style}
            />
          </div>

          <button type="submit" className="btn  btn-raised" disabled={(!goodInput ? true : false)}>
            Sign up
          </button>
        </form>
      </div>
    );
  }

  const showLoading = () => {
    return (
      <div className="jumbotron">
        Loading...
      </div>
    )
  }

  return (
    <>
      <NavBar history={props.history}/>
      <div className="container sign-up-container">
        <div className="header">
          <h1>Sign Up</h1>
        </div>


        <div className="alert alert-danger" style={{display : (input.error.length) ? "" : "none"}}>
          {input.error}
        </div>

        {input.loading ? showLoading() : signupForm()}


      </div>
    </>
  );
};

export default Signup;

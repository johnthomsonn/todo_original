import React, {useState, useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import {Redirect, Link} from 'react-router-dom'
import "./Signin.css";
import {cleanInput, validateEmail} from "../../auth/Auth";

const Signin = (props) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    error: "",
    redirect : false,
    redirectError : ""
  });
  const [goodInput, setGoodInput] = useState(false);

useEffect(() => {
  checkForRedirectError()
}, [])

  useEffect( () => {
    validateInput();
  }, [input])

  const checkForRedirectError = () => {
    if(props.location)
    {
      if(props.location.state)
      {
        if(props.location.state.redirectError){
          setInput({...input, redirectError : props.location.state.redirectError})
        }
      }

    }
  }

  const handleChange = name => event => {
    const userIn = event.target.value;
    setInput({...input, [name]: userIn});
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (goodInput) {
      setInput({...input, error: ""});
      signIn();
    } else {
      setInput({
        ...input,
        error: "Please ensure all fields are filled with valid input"
      });
    }
  };

  const validateInput = () => {
    setGoodInput(
        validateEmail(input.email) &&
        input.password.length >= 1
    );
  };


  const style = {
    backgroundImage: `linear-gradient(0deg, #eddf91 2px, rgba(0, 150, 136, 0) 0),
    linear-gradient(0deg, rgba(0, 0, 0, 0.26) 1px, transparent 0)`
  };

  const signIn =  () => {
    setInput({...input, loading : true})
    fetch("http://localhost:5000/auth/signin", {
      method : "POST",
      mode : 'cors',
      credentials : 'include',
      headers :{
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
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
        window.localStorage.setItem("user", JSON.stringify(data.user))
        window.localStorage.setItem("status" , data.status)
        setInput({...input, redirect : true})
      }
    }
  }).catch(err => console.log(err))

  }

  if(input.redirect)
  {
    const userObj = JSON.parse(window.localStorage.getItem("user"));
    return <Redirect to={`/${userObj.username}`} />
  }



  return (
    <>
      <NavBar history={props.history}/>

      <div className="container sign-in-container">
        <div className="header">
          <h1>Sign In</h1>
        </div>

        <div
          className="alert alert-danger"
          style={{display: input.error.length ? "" : "none"}}
        >
          {input.error}
        </div>

        <div
          className="alert alert-danger"
          style={{display: input.redirectError.length > 1 ? "" : "none"}}
        >
          {input.redirectError}. Please do so below or {<Link to="/signup"> sign up </Link>}

        </div>

        <div className="signin-form-div">
          <form className="signin-form" onSubmit={handleSubmit}>
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
            </div>
            <button
              type="submit"
              className="btn  btn-raised"
              disabled={!goodInput ? true : false}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;

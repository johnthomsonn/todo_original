import React, {useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import './Home.css'
import CreateTodo from '../main/CreateTodo'

const Home = (props) => {

useEffect( () => {
  checkCookie();
}, [])

const getCookie = async () => {
  fetch("http://localhost:5000/test/cookie")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

const clearCookie = () => {
  fetch("http://localhost:5000/test/clear");
}

const checkCookie = () => {
    const authtoken = document.cookie
}
  return (
    <>
      <NavBar history={props.history} />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <CreateTodo />
        </div>

        <button onClick={() => getCookie()} > Get cookie </button>

        <button onClick={() => clearCookie()} > clear cookie </button>



        <div className="row todo-items">
          <div className="col-md-3">some items</div>
        </div>
      </div>
    </>
  );
};

export default Home;

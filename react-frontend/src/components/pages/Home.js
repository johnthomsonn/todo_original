import React, {useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import './Home.css'
import CreateTodo from '../main/CreateTodo'

const Home = () => {

useEffect( () => {
  checkCookie();
}, [])

const checkCookie = () => {
    const authtoken = document.cookie
}
  return (
    <>
      <NavBar />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <CreateTodo />
        </div>


        <div className="row todo-items">
          <div className="col-md-3">some items</div>
        </div>
      </div>
    </>
  );
};

export default Home;

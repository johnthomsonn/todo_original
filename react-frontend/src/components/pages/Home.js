import React, {useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import './Home.css'
import CreateTodo from '../main/CreateTodo'

const Home = (props) => {

useEffect( () => {
  checkCookie();
}, [])


const checkCookie = () => {
    const authtoken = document.cookie
}

if(props.match.params.error != null)
{
  console.log("ERRORORORORORORO")
}
  return (
    <>
      <NavBar history={props.history} />

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

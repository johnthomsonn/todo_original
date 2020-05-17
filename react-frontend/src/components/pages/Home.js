import React from "react";
import NavBar from "../main/NavBar/NavBar";
import HomeCss from './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt as pencil } from '@fortawesome/free-solid-svg-icons'
const Home = () => {
  return (
    <>
      <NavBar />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-3 todo-create mt-5">
            <form className="todo-text flex-inline">
              <input type="text" placeholder="write something" />
              <button type="button" style={{backgroundColor: "#eddf91",  height: "130%"}}  class="btn btn-primary bmd-btn-fab todo-create-pencil-btn">
        <i class="material-icons" ><FontAwesomeIcon icon={pencil} color="black" className="fa-pencil"/></i>
      </button>
            </form>
          </div>
        </div>


        <div className="row todo-items">
          <div className="col-md-3">some items</div>
        </div>
      </div>
    </>
  );
};

export default Home;

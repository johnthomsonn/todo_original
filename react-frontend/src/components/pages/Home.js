import React from "react";
import NavBar from "../main/NavBar/NavBar";
const Home = () => {
  return (
    <>
      <NavBar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 todo-create">Create a new todo item</div>
        </div>

        <div className="row todo-items">
          <div className="col-md-3">some items</div>
        </div>
      </div>
    </>
  );
};

export default Home;

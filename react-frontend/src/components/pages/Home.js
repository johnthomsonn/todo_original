import React, {useEffect} from "react";
import NavBar from "../main/NavBar/NavBar";
import './Home.css'
import CreateTodo from '../main/CreateTodo'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck as tick} from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {



  const animatePerLine = (li) => {
    li.classList.add("checked");
  }

const clickedTodo = event => {
  event.target.classList.toggle("checked")
}

if(props.match.params.error != null)
{
  console.log("ERRORORORORORORO")
}
  return (
    <>
      <NavBar history={props.history} />

      <div className="container-fluid">

      <section id="header">
        <p className="header-title">ToDo Lists</p>

        <p className="header-sub-title">Organising your day <FontAwesomeIcon icon={tick} className="tick" /></p>

      </section>
<hr />
      <section id="main" className="">
          <ul className="about-todo-list about-text">
          <li className="todo-li" onClick={clickedTodo}>Create your own private account</li>
          <li className="todo-li" onClick={clickedTodo}>Create as many todo lists as you need</li>
          <li className="todo-li" onClick={clickedTodo}>Create specific todo items for each list</li>
          <li className="todo-li" onClick={clickedTodo}>Check or uncheck as and when you need</li>
          <li className="todo-li" onClick={clickedTodo}>Remove checked items when you are finished</li>
          </ul>

      </section>


      </div>
    </>
  );
};

export default Home;

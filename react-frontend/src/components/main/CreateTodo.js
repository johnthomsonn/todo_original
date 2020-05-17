import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt as pencil} from "@fortawesome/free-solid-svg-icons";
import  "./CreateTodo.css";

const CreateTodo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [goodInput,setGoodInput] = useState(false)


  useEffect( () =>{
    validInput()
  } ,[todoInput])

  const handleChange = evt => {
    const input = evt.target;
    setTodoInput(input.value);

  };

  const validInput = () => {

    if(todoInput == "" || /[\[\]<>^!@\"()#}\/{+\s]/.test(todoInput))
    {
      setGoodInput(false)
    }else
    {
      setGoodInput(true)
    }
  }

  const submitTodo = evt => {
    evt.preventDefault();
    if(todoInput === "")
    {
      alert("You must enter something");
      return;
    }
    alert(todoInput)
    setTodoInput("")
  };


  return (
    <div className="col-3 todo-create mt-5">
      <form className="todo-text " onSubmit={submitTodo}>
        <input
          type="text"
          placeholder="write something"
          value={todoInput}
          onChange={handleChange}
        />
        <button
          type="submit"
          id="create-todo-btn-id"
          onClick={submitTodo}
          className="btn btn-primary bmd-btn-fab todo-create-pencil-btn"
          style={{display: (goodInput ? "" : "none")}}
        >
          <i className="material-icons">
            <FontAwesomeIcon
              icon={pencil}
              color="black"
              className="fa-pencil"
            />
          </i>
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;

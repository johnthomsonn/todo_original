import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt as pencil} from "@fortawesome/free-solid-svg-icons";
import  "./CreateTodo.css";
import {cleanInput} from '../../auth/Auth'


const CreateTodo = props => {
  const [todoInput, setTodoInput] = useState("");
  const [goodInput,setGoodInput] = useState(false)
  const [error, setError] = useState("")


  useEffect( () =>{
    validInput()
  } ,[todoInput])

  const handleChange = evt => {
    const input = evt.target;
    setTodoInput(input.value);

  };



  const validInput = () => {

    if(todoInput === "" )
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
    setTodoInput("")
    submitTodoToServer()
  };

  const submitTodoToServer = async () => {
    try
    {
      const fetchresponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.username}/lists/${props.match.params.list}/items`,
      {
        method : "POST",
        mode : "cors",
        credentials : "include",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({content : todoInput})
      })

      const responseData = await fetchresponse.json()

      if(responseData.error)
      {
        setError(responseData.error)
      }
      else
      {
        props.addItem(responseData.item)
      }

    }
    catch(err)
    {
      console.log("Error submitting todo: " + err)
    }
  }


  return (<>

    <div
      className="alert alert-danger"
      style={{ position : "absolute",display: error.length ? "" : "none", top: "100px"}}
    >
      {error}
    </div>

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
  </>);
};

export default CreateTodo;

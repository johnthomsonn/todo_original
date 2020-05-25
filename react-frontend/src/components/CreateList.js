import React, {useState} from "react";
import "./CreateList.css";
import {Redirect} from 'react-router-dom'

const CreateList = props => {
  const [listName, setListName] = useState("");
  const [invalid, setInvalid] = useState([]);
  const [error, setError] = useState("")
  const [redirect, setRedirect] = useState(false)

  const onFormSubmit = async evt => {
    evt.preventDefault();

try {
  const username = JSON.parse(window.sessionStorage.getItem('user')).username
    const fetchResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/${username}/lists`, {
      method : "POST",
      mode : "cors",
      credentials : "include",
      body: JSON.stringify({name : listName}),
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      }
    })

    const dataJson = await fetchResponse.json()
    // list could not be created
    if(dataJson.error)
    {
      setError(dataJson.error)
    }
    //list was created
    else
    {

      props.setLists(dataJson.list)
      setRedirect(true)
    }
  }
  catch(err)
  {
    console.log("Error when trying to create a list : " + err)
  }

  };



  const handleChange = event => {
    const name = event.target.value;
    const invalidChars = name.match(/[*^<>@'/\\"\d]/gi);
    if (invalidChars) {
      setInvalid(invalidChars);
    } else {
      setInvalid([]);
    }
    setError("")
    setListName(event.target.value);
  };

  const showCreateList = () => {
    return (
      <>
        <h4>Create a new list</h4>

        <form className="create-form" onSubmit={onFormSubmit}>
          <input
            type="text"
            name="name"
            value={listName}
            onChange={handleChange}
            placeholder="Unique list name"
          />
          <button
            type="submit"
            className="btn  btn-raised  btn-outline"
            disabled={listName.length > 0 && invalid.length == 0 ? false : true}
          >
            Create List
          </button>
        </form>


      </>
    );
  };

  if(redirect)
  {
    return <Redirect to={`/${props.user.username}/${listName}`} />
  }

  return (
    <div className="create-list">
      {props.user.username != "" && showCreateList()}



      <div
        className="alert alert-danger"
        style={{display: invalid.length > 0 ? "" : "none", fontSize : "0.9rem"}}
      >
      List name cannot contain {invalid}
      </div>
      <div
        className="alert alert-danger"
        style={{display: error.length > 0 ? "" : "none", fontSize : "0.9rem"}}
      >
      {error}
      </div>

    </div>
  );
};

export default CreateList;

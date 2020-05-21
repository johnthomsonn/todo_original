import React, {useState} from "react";
import "./CreateList.css";

const CreateList = props => {
  const [listName, setListName] = useState("");
  const [invalid, setInvalid] = useState([]);

  const onFormSubmit = evt => {
    evt.preventDefault();
    alert("clicked")
  };

  const handleChange = event => {
    const name = event.target.value;
    const invalidChars = name.match(/[*^<>'"]/gi);
    if (invalidChars) {
      setInvalid(invalidChars);
    } else {
      setInvalid([]);
    }
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

  return (
    <div className="create-list">
      {props.user.username != "" && showCreateList()}

      <div
        className="alert alert-danger"
        style={{display: invalid.length > 0 ? "" : "none", fontSize : "0.8rem"}}
      >
      List name cannot contain {invalid}
      </div>

    </div>
  );
};

export default CreateList;

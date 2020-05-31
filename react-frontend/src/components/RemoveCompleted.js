import React from "react";
import "./RemoveCompleted.css";

        import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
        import {faTrash as trash} from "@fortawesome/free-solid-svg-icons";

const RemoveCompleted = props => {
  const btnStyle = {
    border: "2px solid black",
    backgroundColor: "#eddf91",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    fontFamily: "Balsamiq Sans, cursive"
  };

  const serverCallSingle = item => {
    fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.username}/lists/${props.match.params.list}/items/${item._id}`  ,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(item)
      }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log("Error making server delete item call: ", err));
  };

  const serverCallMultiple = (keep,remove) => {
    const body =[keep,remove]
    fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.username}/lists/${props.match.params.list}/items`  ,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log("Error making server delete item call: ", err));
  }

  const remove = async () => {
    let allItems = [...props.items]
    let itemsToRemove = []
    let itemsKept = []
    allItems.filter(item => {
      if(item.completed === true)
        itemsToRemove.push(item)
        else
        itemsKept.push(item)
    });
    if (itemsToRemove.length == 1) {
      await serverCallSingle(itemsToRemove[0])
    }
    else if(itemsToRemove.length > 1)
    {
      await serverCallMultiple(itemsKept, itemsToRemove)
    }
    props.updateitemsAfterDelete(itemsKept)
  };

  return (
    <>
      <div className="remove-completed-div">
        <button
          onClick={remove}
          className="remove-button btn btn-outline btn-raised"
          style={btnStyle}
        >
          Remove completed items
            <FontAwesomeIcon icon={trash} className="trash" />
        </button>



      </div>
    </>
  );
};

export default RemoveCompleted;

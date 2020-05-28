import React, {useState, useEffect} from "react";
import "./TodoItem.css";

const TodoItem = props => {
  const [item, setItem] = useState({
    id: "",
    content: "",
    completed: false
  });

  useEffect(() => {
    setItem({
      id: props.id,
      content: props.content,
      completed: props.completed
    });
  }, []);

  useEffect(() => {
    checkForStyleCss();
  }, [item.completed]);

  const checkForStyleCss = () => {
    let thisTodo = document.getElementById(`${item.id}`);
    if (thisTodo !== null) {
      if (item.completed) {
        thisTodo.classList.add("checked");
      } else {
        thisTodo.classList.remove("checked");
      }
    }
  };

  let styles = "item-container";

  const checkTodo = evt => {
    checkTodoOnServer();
  };

  const checkTodoOnServer = async () => {
    try {
      const fetchResult = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/${
          props.match.params.username
        }/lists/${props.match.params.list}/items/${item.id.toString()}/toggle`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const data = await fetchResult.json();
      if(!data.error) {
      await setItem({
        ...item,
        completed: data.item.completed
      });
      console.log("returned data for completion " ,data.item.completed)
      props.updateTodo(item)
    }
    else
    {
      console.log(data.error)
    }
    } catch (err) {
      console.log("error toggling " + err);
    }
  };

  return (
    <>
      <div className={styles} onClick={checkTodo} id={item.id}>
        <p className="todo-content">{props.content}</p>
      </div>
    </>
  );
};

export default TodoItem;

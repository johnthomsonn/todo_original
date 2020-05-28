import React, {useState, useEffect} from "react";
import CreateTodo from "../main/CreateTodo";
import NavBar from "../main/NavBar/NavBar";
import "./ListPage.css";
import TodoItem from "../TodoItem";
import RemoveCompleted from "../RemoveCompleted";

const ListPage = props => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchList();
  }, []);

  const addItem = item => {
    setItems([...items, item]);
  };

  const fetchList = async () => {
    try {
      const listResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/${props.match.params.username}/lists/${props.match.params.list}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json"
          }
        }
      );

      const listData = await listResponse.json();
      setItems(listData.list.items);
    } catch (err) {
      console.log("Error fetching the list ", err);
    }
  };

  const updateTodo = todo => {
    let old = items;
    let copy = [...items];
    let newItems = items.map(item => {
      if (item._id == todo.id) {
        item.completed = !todo.completed;
      }
      return item;
    });
    setItems(newItems);
  };

  const updateItemsAfterDelete = items => {
    setItems(items)
  }

  return (
    <>
      <NavBar history={props.history} />
      <div
        className="alert alert-danger"
        style={{display: error.length ? "" : "none"}}
      >
        {error}
      </div>

      <div className="list-page-top">
        <CreateTodo {...props} addItem={addItem} />

        <div className="remove-completed">
          <RemoveCompleted {...props} items={items} updateitemsAfterDelete={updateItemsAfterDelete} />
        </div>
      </div>

      <hr style={{marginTop: "5%"}} />

      <div className="list-page-bottom  ">
        {items !== undefined &&
          items.map((item, index) => (
            <TodoItem
              content={items[index].content}
              key={index}
              id={items[index]._id}
              {...props}
              completed={items[index].completed}
              updateTodo={updateTodo}
            />
          ))}
      </div>
    </>
  );
};

export default ListPage;

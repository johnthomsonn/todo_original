import React, { useState, useEffect } from "react";
import CreateTodo from "../main/CreateTodo";
import NavBar from "../main/NavBar/NavBar";
import "./ListPage.css";
import TodoItem from "../TodoItem";
import RemoveCompleted from "../RemoveCompleted";

const ListPage = props => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [listName, setListName] = useState("");

  useEffect(() => {
    fetchList();
  }, []);


  //useEffect( () => listTodos(), [items])

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
      setListName(listData.list.name);
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

  // items were not updating properly with just setitems(items)
  // fixed with setting empty array first but must be better solution.
  const updateItemsAfterDelete = items => {
    setItems([])
    setItems(items)
  }

  const listTodos = () => {
    return items.map((item, index) => (
      <TodoItem
        content={items[index].content}
        key={index}
        id={items[index]._id}
        {...props}
        completed={items[index].completed}
        updateTodo={updateTodo}
      />
    ))
  }

  return (
    <>
      <NavBar history={props.history} />
      <div
        className="alert alert-danger"
        style={{ display: error.length ? "" : "none" }}
      >
        {error}
      </div>

      <div className="list-page-top">

        <div className="list-name">
          <h3>{listName}</h3>
        </div>

        <CreateTodo {...props} addItem={addItem} />

        <div className="remove-completed">
          <RemoveCompleted {...props} items={items} updateitemsAfterDelete={updateItemsAfterDelete} />
        </div>
      </div>

      <hr style={{ marginTop: "5%" }} />

      <div className="list-page-bottom  ">
        {items !== undefined &&
          listTodos()}
      </div>
    </>
  );
};

export default ListPage;

import React, {useState, useEffect} from "react";
import CreateTodo from "../main/CreateTodo";
import NavBar from "../main/NavBar/NavBar";
import "./ListPage.css";
import TodoItem from "../TodoItem";

const ListPage = props => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    fetchList();
  }, []);

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
      console.log(listData)
      setItems(listData.list.items);
    } catch (err) {
      console.log("Error fetching the list ", err);
    }
  };

  return (
    <>
      <NavBar history={props.history} />
      <div className="alert alert-danger" style={{display : (error.length) ? "" : "none"}}>
        {error}
      </div>

      <div className="list-page-top">
        <CreateTodo />
      </div>

      <hr style={{marginTop: "5%"}} />

      <div className="list-page-bottom">
        {items !== undefined &&
          items.map((item, index) => (
            <TodoItem content={items[index].content} key={index} />
          ))}
      </div>
    </>
  );
};

export default ListPage;

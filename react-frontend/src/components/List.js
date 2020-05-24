import React, {useEffect, useState} from "react";
import "./List.css"
import {Redirect} from 'react-router-dom'

const List = props => {
  useEffect(() => {
    getList();
  }, []);

  const [list, setList] = useState({
    _id : "",
    name : "",
    items : [],
    redirect : false
  });

  const clickList = event => {
    const url = `/${props.user.username}/${list.name}`
    setList({...list, redirect : true})
  }

  if(list.redirect)
  {
    return <Redirect to={`/${props.user.username}/${list.name}`} />
  }



  const getList = () => {
    fetch(
      `http://localhost:5000/users/${props.match.params.username}/lists/listid/${props.listId}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => setList({
          _id : data.list._id,
          name : data.list.name,
          items : data.list.items
      }))
      .catch(err =>
        console.log("ERROR getting individual list form id: " + err)
      );
  };

  return (
    <>
      <div className="list-summary-div" onClick={clickList}>
        <h2>{list.name}</h2>
        <h4>#items: {list.items.length}</h4>



      </div>
    </>
  );
};

export default List;

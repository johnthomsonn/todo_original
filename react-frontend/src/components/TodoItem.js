import React from 'react'
import './TodoItem.css'

const TodoItem = props => {


  return (<>
    <div className="item-container">
      <p className="todo-content">
        {props.content}
      </p>
    </div>
  </>);
}

export default TodoItem;

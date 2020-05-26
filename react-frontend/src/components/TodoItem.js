import React, {useState, useEffect} from 'react'
import './TodoItem.css'

const TodoItem = props => {

const [id,setID] = useState("")
  useEffect(() => setID(props.id), [])
  let styles = 'item-container'

  const checkTodo = (evt) => {
    // evt.target.classList.toggle("checked")
    document.getElementById(`${id}`).classList.toggle("checked")
  }

  return (<>
    <div className={styles} onClick={checkTodo} id={id}>
      <p className="todo-content">
        {props.content}
      </p>
    </div>
  </>);
}

export default TodoItem;

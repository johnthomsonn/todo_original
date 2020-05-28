import React from 'react'
import './RemoveCompleted.css'


const RemoveCompleted = props => {

const btnStyle = {
  border: "2px solid black",
  backgroundColor : "#eddf91",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  fontFamily: "Balsamiq Sans, cursive"
}

  const remove = () =>{
    let itemsToRemove = props.items.filter(item => item.completed === true)

  }

  return (<>
    <div className="remove-completed-div">

    <button onClick={remove} className="remove-button btn btn-outline btn-raised" style={btnStyle}>
      Remove completed items
    </button>
    </div>
  </>)
}

export default RemoveCompleted

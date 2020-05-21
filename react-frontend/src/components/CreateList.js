import React, {useState} from 'react'
import './CreateList.css'

const CreateList = (props) => {

 const [listName, setListName] = useState("")

const onFormSubmit =(evt) => {
  evt.preventDefault();


}

const handleChange = event => {
  setListName(event.target.value)
}

const showCreateList = () => {
  return (<>
    <h4>Create a new list</h4>

    <form className="create-form" onSubmit={onFormSubmit}>
      <input type="text" name="name" value={listName} onChange={handleChange} placeholder="Unique list name" />
      <button type="submit" className="btn  btn-raised  btn-outline" disabled={(!listName.length > 0 ? false : true)}>
      Create List
      </button>
    </form>


    </>);
}

  return (
      <div className="create-list">
        {props.user.username != "" && showCreateList()}
    </div>
  )
}



export default CreateList;

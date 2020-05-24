import React, {useEffect} from 'react'
import './ProfileShowLists.css'
import List from './List'
const ProfileShowLists = (props) => {

const style = {
  display : "flex",
  alignItems : "center",
  flexDirection : "column",
}

useEffect(() => {

},[])


  return (<>
    <div className="show-lists-container">
      <h3> Your lists </h3>
      <div className="show-lists" style={style}>
        {props.lists.map((list,index) => <List listId={list} key={index} {...props} /> )}
      </div>

    </div>
  </>)
}

export default ProfileShowLists;

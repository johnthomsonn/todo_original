import React, {useState, useEffect} from 'react'
import NavBar from "../main/NavBar/NavBar";
import {Redirect} from 'react-router-dom'
import ProfileInfo from '../ProfileInfo'
import CreateList from '../CreateList'
import ProfileShowLists from '../ProfileShowLists'

const Profile = (props) => {

  const [user,setUser] = useState({
    status: "",
    id : "",
    username : "",
    email : "",
    created: "",
    redirect : false,
    lists :[]
  })

//Don't think I need this anymore, will remove later
//TODO remove
  const [list, setList] = useState({
    name : "",
    items : []
  })

  useEffect(() =>{
    getUserProfile()
  },[])

  useEffect(() =>{
    tryGetList();
  }, [props.match.params.listm, list])

  const tryGetList = () => {
    if(props.match.params.list)
      getList();
  }

  const setNewList = (list) => {
    setList(list)
    let l = user.lists
    l.push(list)
    setUser({...user, lists : l})
  }

  const getList = async () => {
    try{
      const fetchResponse = await fetch(`http://localhost:5000/users/${user.username}/${props.match.params.list}`,{
        method : "GET",
        mode :"cors",
        credentials : 'include',
        headers : { Accept : "application/json"}
      })

      const data = await fetchResponse.json();
      setList(data)
    }
    catch(err)
    {
      alert("Error when fetching the list")
    }
  }


  const getUserProfile =() =>  {

    fetch(`http://localhost:5000/users/${props.match.params.username}`,{
      method : "GET",
      mode : 'cors',
      credentials : 'include',
      headers :{
        Accept : "application/json"
      }
    })
      .then(res =>res.json())
      .then(data => {
        if(data.error)
        {
            setUser({...user, redirect : true})
        }
        else
        {
          setUser({...user,
            username : data.user.username,
            id : data.user._id,
            email : data.user.email,
            created : data.user.created,
            lists: data.user.lists
          })
        }
      })
      .catch(err => console.log("ERROR: " + err))
  }

  if(user.redirect)
  {
    return <Redirect to={"/?error=notlogged"} />
  }

  return (
    <div className="profile-info-container ">

    <NavBar history={props.history} lists={user.lists}/>

    <div
      className="alert alert-danger"
      style={{display: user.error? "" : "none"}}
    >
      {user.error}
    </div>

    <div className="row">

    <div className="col-md-3">
      <ProfileInfo user={user}  />
      <CreateList user={user} setLists={setNewList}/>
</div>
<div className="col-md-8">
      <ProfileShowLists lists={user.lists} {...props} user={user}/>
</div>
      </div>



    </div>
  );
}


export default Profile;

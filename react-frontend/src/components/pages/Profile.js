import React, {useState, useEffect} from 'react'
import NavBar from "../main/NavBar/NavBar";
import {Redirect} from 'react-router-dom'

const Profile = (props) => {

  const [user,setUser] = useState({
    status: "",
    id : "",
    username : "",
    email : "",
    created: "",
    redirect : false
  })

  useEffect(() =>{
    getUserProfile()
  }, [])

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
          console.log("we have the data")
          console.log(data)
          setUser({...user,
            username : data.username
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
    <>

    <NavBar history={props.history}/>

    <div
      className="alert alert-danger"
      style={{display: user.error? "" : "none"}}
    >
      {user.error}
    </div>


    </>
  );
}


export default Profile;

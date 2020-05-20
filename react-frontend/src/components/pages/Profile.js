import React, {useState, useEffect} from 'react'
import NavBar from "../main/NavBar/NavBar";

const Profile = (props) => {

  const [user,setUser] = useState({})

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
            setUser({...user, error : data.error})
        }
        else
        {
          console.log("NO ERROR AND WE HAVE THE PROFILE: "  + data)
        }
      })
      .catch(err => console.log("ERROR: " + err))


  }

  return (
    <>

    <NavBar history={props.history}/>
    {console.log("USER PROFILE FOR: " + props.match.params.username)}

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

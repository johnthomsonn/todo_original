import React, {useState, useEffect} from 'react'
import NavBar from "../main/NavBar/NavBar";

const Profile = (props) => {

  const [use,setUser] = useState("")

  useEffect(() =>{
    getUserProfile()
  }, [])

  const getUserProfile =() =>  {
    fetch(`http://localhost:5000/users/${props.match.params.username}`);

    
  }

  return (
    <>

    <NavBar />
    {console.log("USER PROFILE FOR: " + props.match.params.username)}
    </>
  );
}


export default Profile;

import React from 'react'
import './ProfileInfo.css'

const ProfileInfo = props => {

  const showInfo = () => {
    return (<>
      <p className="info">
      {props.user.username}
      </p>

      <p className="info">
      {props.user.email}
      </p>

      <p className="info">
      {new Date(props.user.created).toLocaleDateString()}
      </p>

      <p className="info">
      {
          props.user.lists.length === 1 ? `${props.user.lists.length} list` : `${props.user.lists.length} lists`
      }
      </p>
      </>);
  }



  const shownoUser = () => {
    return (
      <>
        <p className="info alert alert-danger">No user profile. Please refresh the page </p>
      </>
    );
  }

return (<>

 <div className="profile-info-box">

 {props.user.username != "" ? showInfo() : shownoUser()}

 </div>

</>);
}


export default ProfileInfo;

import React from 'react'
import './ProfileInfo.css'

const ProfileInfo = props => {

return (<>

 <div className="profile-info-box">

    <p className="info">
    {props.user.username}
    </p>

    <p className="info">
    {props.user.email}
    </p>

    <p className="info">
    {new Date(props.user.created).toLocaleDateString()}
    </p>
 </div>

</>);
}


export default ProfileInfo;

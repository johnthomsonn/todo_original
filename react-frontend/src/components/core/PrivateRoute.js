import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isLoggedInBasic} from "../../auth/Auth"

const PrivateRoute = ({component : Component, ...rest}) => (
// props means components passed down to this component
<Route {...rest} render={props => isLoggedInBasic() ? (
  <Component {...props}/>
) : (
  <Redirect to={{pathname : "/signin", state:{from:props.location, redirectError : "You must be logged in to view this profile"}}} />
)}
/>

)

export default PrivateRoute;

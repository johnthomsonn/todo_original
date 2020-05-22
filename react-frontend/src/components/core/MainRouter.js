import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Profile from '../pages/Profile'
import ListPage from '../pages/ListPage'
import Error404 from '../pages/404'
import PrivateRoute from "./PrivateRoute"


const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/:username" exact component={Profile} />
        <PrivateRoute path="/:username/:list" exact component={ListPage} />
        <Route path="/" component={Error404} />
      </Switch>
    </div>
  );
}

export default MainRouter;

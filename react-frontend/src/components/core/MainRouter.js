import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import Profile from '../pages/Profile'
import Error404 from '../pages/404'

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/:username" exact component={Profile} />
        <Route path="/" component={Error404} />
      </Switch>
    </div>
  );
}

export default MainRouter;

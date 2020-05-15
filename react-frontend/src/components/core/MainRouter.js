import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
  );
}

export default MainRouter;

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Spa from './Spa'
import SignIn from '../containers/SignIn'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/sign-in" component={SignIn}/>
      <Route path="*" component={Spa}/>
    </Switch>
  </Router>
);

export default Routes

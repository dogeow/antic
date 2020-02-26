import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Spa from './Spa'
import Dashboard from './Dashboard'
import Login from '../containers/Login'

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/dashboard" component={Dashboard}/>
    <Route path="*" component={Spa}/>
  </Switch>
);

export default Routes

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Spa from './Spa'
import Login from '../containers/Login'

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/dashboard" component={Login}/>
    <Route path="*" component={Spa}/>
  </Switch>
);

export default Routes

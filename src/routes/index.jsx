import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../containers/Login";
import Dashboard from "./Dashboard";
import Spa from "./Spa";

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="*" component={Spa} />
  </Switch>
);

export default Routes;

import loadable from "@loadable/component";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Spa from "./Spa";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/projects"
      component={loadable(() => import("../Project"))}
    />
    <Route
      exact
      path="/login"
      component={loadable(() => import("../containers/Login"))}
    />
    <Route
      path="/dashboard"
      component={loadable(() => import("./Dashboard"))}
    />
    <Route path="*" component={Spa} />
  </Switch>
);

export default Routes;

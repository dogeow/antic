import loadable from "@loadable/component";
import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Spa from "./Spa";

export default () => (
  <Switch>
    <Route
      exact
      path="/projects"
      component={loadable(() => import("../containers/Project"))}
    />
    <Route
      exact
      path="/login"
      component={loadable(() => import("../containers/users/Login"))}
    />
    <Route
      path="/dashboard"
      component={loadable(() => import("./Dashboard"))}
    />
    <Route path="*" component={Spa} />
  </Switch>
);

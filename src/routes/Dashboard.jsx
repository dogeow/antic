import loadable from "@loadable/component";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Loading from "../components/Loading";
import Application from "../containers/dashboard/Application";
import Header from "../containers/dashboard/Header";
import Home from "../containers/dashboard/Home";
import NoMatch from "../containers/NoMatch";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route
            path="/dashboard/site"
            component={loadable(() => import("../containers/dashboard/Site"), {
              fallback: <Loading />,
            })}
          />
          <Route path="/dashboard/application" component={Application} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
};

export default Dashboard;

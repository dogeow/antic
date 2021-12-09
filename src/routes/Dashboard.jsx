import loadable from "@loadable/component";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "components/Loading";
import Application from "containers/dashboard/Application";
import Header from "containers/dashboard/Header";
import Home from "containers/dashboard/Home";
import NoMatch from "containers/NoMatch";
import * as React from "react";
import { Route, Routes } from "react-router-dom";

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
        <Routes>
          <Route exact path="/dashboard" element={Home} />
          <Route
            path="/dashboard/site"
            element={loadable(() => import("containers/dashboard/Site"), {
              fallback: <Loading />,
            })}
          />
          <Route path="/dashboard/application" element={Application} />
          <Route
            path="/dashboard/pics"
            element={loadable(() => import("containers/dashboard/Pics"))}
          />
          <Route element={NoMatch} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;

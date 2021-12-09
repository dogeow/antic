import CssBaseline from "@mui/material/CssBaseline";
import makeStyles from "@mui/styles/makeStyles";
import Header from "containers/dashboard/Header";
import * as React from "react";
import { Outlet } from "react-router-dom";

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
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

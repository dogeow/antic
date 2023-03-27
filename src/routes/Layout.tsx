import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Loading from "../components/display/Loading";
import ScrollButton from "../components/display/ScrollButton";
import Search from "../components/Search";
import Settings from "../components/Settings";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import Snack from "../containers/Snack";

const useStyles = makeStyles({
  main: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  backToTop: {
    position: "fixed",
    width: 50,
    height: 50,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
});

export default () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid id="app" container direction="column" style={{ minHeight: "100vh" }}>
      <Header />
      <Grid
        container
        component={Container}
        maxWidth="lg"
        classes={["/nav", "/cars"].includes(location.pathname) ? { root: classes.main } : undefined}
        style={
          location.pathname === "/"
            ? {
                display: "flex",
                marginTop: 16,
                marginBottom: 16,
                flexGrow: 1,
              }
            : { display: "flex", marginTop: 16, marginBottom: 16 }
        }
      >
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Grid>
      {["/"].includes(location.pathname) && <Footer />}
      {["/"].includes(location.pathname) || <ScrollButton />}
      <Search />
      <Settings />
      <Snack />
    </Grid>
  );
};

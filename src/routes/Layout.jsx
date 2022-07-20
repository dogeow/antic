import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import Loading from "../components/Loading";
import Footer from "../containers/Footer";
import Header from "../containers/Header";

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
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
      <Header />
      <Grid
        container
        component={Container}
        maxWidth="lg"
        classes={
          ["/nav", "/cars"].includes(location.pathname)
            ? { root: classes.main }
            : undefined
        }
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
      {["/"].includes(location.pathname) || (
        <ScrollUpButton
          ShowAtPosition={500}
          ContainerClassName="AnyClassForContainer"
          TransitionClassName="AnyClassForTransition"
          style={{ outline: "none", boxShadow: "none" }}
        >
          <img
            src={`${import.meta.env.VITE_CDN_URL}/bfr.png`}
            width="24"
            alt="Back to top arrow"
          />
        </ScrollUpButton>
      )}
    </Grid>
  );
};

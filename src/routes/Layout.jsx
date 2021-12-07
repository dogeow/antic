import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Loading from "components/Loading";
import Footer from "containers/Footer";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

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
        justify={location.pathname === "/" ? "center" : undefined}
        alignItems={location.pathname === "/" ? "center" : undefined}
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
                textAlign: "center",
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
            src={`${process.env.REACT_APP_CDN_URL}/bfr.png`}
            width="24"
            alt="Back to top arrow"
          />
        </ScrollUpButton>
      )}
    </Grid>
  );
};
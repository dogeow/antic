import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header";
import Footer from "containers/Footer";
import * as React from "react";
import ScrollUpButton from "react-scroll-up-button";

import SpaMain from "./SpaMain";

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

const Spa = ({ match }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" style={{ minHeight: "100vh" }}>
      <Header />
      <Grid
        container
        component={Container}
        maxWidth="lg"
        justify={match.url === "/" ? "center" : undefined}
        alignItems={match.url === "/" ? "center" : undefined}
        classes={
          ["/nav", "/cars"].includes(match.url)
            ? { root: classes.main }
            : undefined
        }
        style={
          match.url === "/"
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
        <SpaMain />
      </Grid>
      {["/"].includes(match.url) && <Footer />}
      {["/"].includes(match.url) || (
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

export default Spa;

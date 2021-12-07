import Container from "@mui/material/Container";
import makeStyles from "@mui/styles/makeStyles";
import Copyright from "components/site/Copyright";
import * as React from "react";

import Site from "./Site";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Site />
      </Container>
      <Copyright />
    </>
  );
};

export default Home;

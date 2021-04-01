import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  "@global": {
    "#project a": {
      display: "block",
    },
    "#project a:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
  },
}));

const Index = () => {
  useStyles();

  return (
    <Container maxWidth="xs" id="project">
      <Grid
        container
        spacing={2}
        justify="center"
        style={{ textAlign: "center" }}
      >
        <Grid item xs={6}>
          <Link to="/posts">
            <span role="img" style={{ fontSize: "3rem" }}>
              📄
            </span>
            <div>笔记</div>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/chat">
            <span style={{ fontSize: "3rem" }}>♂</span>
            <div>聊天室</div>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/api">
            <span role="img" style={{ fontSize: "3rem" }}>
              ⚙️
            </span>
            <div>便民 API</div>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/demo">
            <span role="img" style={{ fontSize: "3rem" }}>
              📦
            </span>
            <div>Demo</div>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;

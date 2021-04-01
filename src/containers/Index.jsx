import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import * as React from "react";

const Index = () => {
  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={2}
        justify="center"
        style={{ textAlign: "center" }}
      >
        <Grid item xs={6}>
          <span role="img" style={{ fontSize: "3rem" }}>
            📄
          </span>
          <div>笔记</div>
        </Grid>
        <Grid item xs={6}>
          <span style={{ fontSize: "3rem" }}>♂</span>
          <div>聊天室</div>
        </Grid>
        <Grid item xs={6}>
          <span role="img" style={{ fontSize: "3rem" }}>
            ⚙️
          </span>
          <div>便民 API</div>
        </Grid>
        <Grid item xs={6}>
          <span role="img" style={{ fontSize: "3rem" }}>
            📦
          </span>
          <div>Demo</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;

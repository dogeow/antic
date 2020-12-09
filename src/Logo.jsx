import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";

const Logo = () => (
  <Grid container alignItems="center">
    <Grid item id="favicon">
      <Avatar alt="滑稽" src="/favicon.ico" />
    </Grid>
    <Grid item>
      <Typography variant="h6" noWrap component="h1">
        {process.env.REACT_APP_NAME}
      </Typography>
    </Grid>
  </Grid>
);

export default Logo;

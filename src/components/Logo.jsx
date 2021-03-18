import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

const Logo = () => (
  <Grid container alignItems="center">
    <Grid item id="favicon">
      <Avatar alt="Doge" src="/logo80.png" />
    </Grid>
    <Hidden only="xs">
      <Grid item>
        <Typography variant="h6" noWrap component="h1">
          {process.env.REACT_APP_NAME}
        </Typography>
      </Grid>
    </Hidden>
  </Grid>
);

export default Logo;

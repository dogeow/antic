import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const Logo = () => (
  <Grid container alignItems="center">
    <Grid key="avatar" item>
      <Avatar alt="滑稽" src="/favicon.ico"/>
    </Grid>
    <Grid key="title" item>
      <Typography variant="h5" component="h1" className="ThreeDee">
        实验室
      </Typography>
    </Grid>
  </Grid>
);

export default Logo;

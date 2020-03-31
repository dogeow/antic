import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ProjectHeader = () => (
  <Grid
    container
    spacing={2}
    justify={'space-between'}
    alignItems={'center'}
  >
    <Grid item>
      <Typography variant="h6" component="h2">
        所有项目
      </Typography>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        component={RouterLink}
        to='/todo/create'
      >
        创建新的项目
      </Button>
    </Grid>
  </Grid>
);

export default ProjectHeader;

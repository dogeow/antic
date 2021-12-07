import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

const ProjectHeader = () => (
  <Grid
    container
    spacing={2}
    justifyContent="space-between"
    alignItems="center"
  >
    <Grid item>
      <Typography variant="h6" component="h2">
        所有项目
      </Typography>
    </Grid>
    <Grid item>
      <RouterLink to="/project/create">
        <Button variant="contained">创建新的项目</Button>
      </RouterLink>
    </Grid>
  </Grid>
);

export default ProjectHeader;

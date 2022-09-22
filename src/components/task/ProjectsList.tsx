import { Badge, Button, Grid, Paper, Theme } from "@mui/material/";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const ProjectsList = ({ projects }) => {
  const classes = useStyles();

  return (
    <Paper>
      <Grid container spacing={2}>
        {projects.map((project, index) => (
          <Grid item xs={12} key={index}>
            <RouterLink to={`/project/${project.id}`}>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                color="secondary"
                showZero
                badgeContent={project.taskCount}
                className={classes.margin}
              >
                <Button variant="contained" color="primary">
                  {project.name} - {project.description}
                </Button>
              </Badge>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ProjectsList;

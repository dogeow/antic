import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

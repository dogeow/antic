import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
            <RouterLink to={`todo/${project.id}`}>
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                color="secondary"
                showZero
                badgeContent={project.tasks_count}
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

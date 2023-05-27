import { Badge, Button, Grid, Paper } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

interface Props {
  projects: Project[];
}

const ProjectsList: React.FC<Props> = ({ projects }) => {
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
                // 使用sx替换makeStyles
                sx={{ margin: 2 }}
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

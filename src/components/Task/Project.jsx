import { gql, useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import * as React, { useEffect, useState } from "react";

import ProjectHeader from "./ProjectHeader";
import ProjectsList from "./ProjectsList";

const PROJECTS = gql`
  query {
    projects {
      id
      name
      description
      taskCount
    }
  }
`;

const Project = () => {
  const [projects, setProjects] = useState([]);

  const { data } = useQuery(PROJECTS);

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ProjectHeader />
      </Grid>
      <Grid item xs={12}>
        {projects.length === 0 ? (
          <div>暂无</div>
        ) : (
          <ProjectsList projects={projects} />
        )}
      </Grid>
    </Grid>
  );
};

export default Project;

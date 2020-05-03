import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ProjectHeader from "./ProjectHeader";
import ProjectsList from "./ProjectsList";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("projects").then((response) => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ProjectHeader />
      </Grid>
      <Grid item xs={12}>
        <ProjectsList projects={projects} />
      </Grid>
    </Grid>
  );
};

export default Project;

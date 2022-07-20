import Grid from "@mui/material/Grid";
import axios from "instance/axios";
import React, { useEffect, useState } from "react";

export default () => {
  const [pics, setPics] = useState([]);

  useEffect(() => {
    axios.get("/pics").then((resp) => {
      setPics(resp.data);
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item container spacing={1}>
        {pics.map((pic) => (
          <Grid item key={pic.id} xs={6} md={3} lg={4}>
            <img
              style={{ width: "100%" }}
              src={`${import.meta.env.VITE_OSS_URL}/${pic.folder}/${pic.name}`}
              alt={pic.name}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

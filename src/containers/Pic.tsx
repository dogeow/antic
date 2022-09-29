import Grid from "@mui/material/Grid";
import React from "react";
import useSWR from "swr";

import { OSS_URL } from "../config/services";

export default () => {
  const { data, error } = useSWR("/pics");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Grid container spacing={1}>
      <Grid item container spacing={1}>
        {data.pics.map((pic: Pic) => (
          <Grid item key={pic.id} xs={6} md={3} lg={4}>
            <img style={{ width: "100%" }} src={`${OSS_URL}/${pic.folder}/${pic.name}`} alt={pic.name} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

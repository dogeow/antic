import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import axios from "../instance/axios";

type Pic = {
  id: number;
  name: string;
  folder: string;
};

export default () => {
  const { data, error } = useSWR("/pics");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Grid container spacing={1}>
      <Grid item container spacing={1}>
        {data.pics.map((pic: Pic) => (
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

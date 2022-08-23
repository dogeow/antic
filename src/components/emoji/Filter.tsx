import Grid from "@mui/material/Grid";
import * as React from "react";

import Category from "./Categories";
import Tag from "./Tag";

const Filter = () => {
  return (
    <Grid container style={{ marginTop: 6 }}>
      <Category />
      <Tag />
    </Grid>
  );
};

export default Filter;

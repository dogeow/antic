import React from "react";
import Category from "./Categories";
import Tag from "./Tag";
import Grid from "@material-ui/core/Grid";

const Filter = (props) => {
  return (
    <Grid container style={{ marginTop: 6 }}>
      {/*  标记数量的数字需要空间 */}
      <Category {...props} />
      <Tag {...props} />
    </Grid>
  );
};

export default Filter;

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChipFlow from "components/ChipFlow";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";

const Categories = () => {
  const history = useHistory();

  const handleClick = (category) => {
    history.push(`/posts?filter[category.name]=${category}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">首页</Link>
          <Link to="/posts">笔记</Link>
          <Typography color="textPrimary">所有分类</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <ChipFlow path="categories" onHandleClick={handleClick} />
      </Grid>
    </Grid>
  );
};

export default Categories;

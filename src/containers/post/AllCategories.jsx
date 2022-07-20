import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import ChipFlow from "../components/ChipFlow";

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/posts?filter[category.name]=${category}`);
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

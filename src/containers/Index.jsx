import Grid from "@material-ui/core/Grid";
import React from "react";

import PostList from "../components/PostList";
import TodoList from "../components/TodoList";

const Index = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md>
        <h2>待办事项</h2>
        <TodoList />
      </Grid>
      <Grid item xs={12} md>
        <h2>文章</h2>
        <PostList />
      </Grid>
    </Grid>
  );
};

export default Index;

import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TodoList from "../components/TodoList";
import PostList from "../components/PostList";

const Index = () => {
  useEffect(() => {
    axios.post("http://127.0.0.1:8000/callback", {
      test: "233",
    });
  });
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

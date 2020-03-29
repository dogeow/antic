import React from 'react';
import TodoList from '../components/TodoList';
import PostList from '../components/PostList';
import Grid from '@material-ui/core/Grid';

const Index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm>
        <TodoList/>
      </Grid>
      <Grid item xs={12} sm>
        <PostList/>
      </Grid>
    </Grid>
  );
};

export default Index;

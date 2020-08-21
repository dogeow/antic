import React from "react";
import Grid from "@material-ui/core/Grid";
import TodoList from "../components/TodoList";
import PostList from "../components/PostList";
import loadGoogleTranslate from "../components/loadGoogleTranslate";

const Index = () => {
  const [googleTranslate, setGoogleTranslate] = React.useState(false);
  React.useEffect(() => {
    loadGoogleTranslate(() => {
      setGoogleTranslate(true);
    });
  });

  return (
    <>
      {googleTranslate ? <div id="google_translate_element" /> : null}
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
    </>
  );
};

export default Index;

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AlertDialog from "../components/AlertDialog";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const PostSingle = () => {
  const [post, setPost] = useState({});
  const [quote, setQuote] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();
  const id = parseInt(match.params.id, 10);

  useEffect(() => {
    axios.get(`posts/${id}`).then(({ data }) => {
      setPost(data);
    });
    axios.get("quote").then(({ data }) => {
      setQuote(data.content);
    });
  }, [id]);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    setAlertDialogOpen(!alertDialogOpen);
    axios.delete(`posts/${id}`);
    history.push("/posts");
  };

  const handleAlertDialogToggle = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  return (
    <>
      <AlertDialog
        open={alertDialogOpen}
        handleClose={handleAlertDialogToggle}
        title="删除确认"
        content="确认删除这篇文章吗？"
        agree={handleDelete}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          {post ? (
            <Typography variant="h4" component="h2">
              {post.title}
            </Typography>
          ) : (
            <Skeleton variant="rect" height={41} width="40%" />
          )}
        </Grid>
        <PostHeader
          post={post}
          handleEdit={handleEdit}
          handleDelete={handleAlertDialogToggle}
        />
        <Grid item xs={12}>
          <PostBody post={post} />
        </Grid>
        {/* {rgba(0,0,0,0.1)} */}
        <Grid
          item
          xs={12}
          style={{
            borderColor: "gray",
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            color: "gray",
          }}
        >
          {quote}
        </Grid>
      </Grid>
    </>
  );
};

export default PostSingle;

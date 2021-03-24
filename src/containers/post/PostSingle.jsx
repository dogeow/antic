import { gql, useQuery } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { postSave } from "../../actions";
import AlertDialog from "../../components/AlertDialog";
import Hr from "../../components/Hr";
import axios from "../../instance/axios";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const useStyles = makeStyles((theme) => {
  return {
    "@global":
      theme.palette.type === "dark"
        ? {
            code: {
              backgroundColor: theme.palette.background.paper,
            },
          }
        : {
            code: {
              backgroundColor: "#eee",
            },
          },
  };
});

const POST_BY_ID_AND_QUOTE = gql`
  query($id: Int!) {
    post(id: $id) {
      id
      title
      content
      created_at
      updated_at
      category {
        name
      }
      tags {
        name
      }
    }
    quote
  }
`;

const PostSingle = ({ postSave }) => {
  useStyles();
  const [post, setPost] = useState({});
  const [quote, setQuote] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const history = useHistory();
  const match = useRouteMatch();
  const id = parseInt(match.params.id, 10);

  const { data } = useQuery(POST_BY_ID_AND_QUOTE, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data) {
      setPost(data.post);
      setQuote(data.quote);
      postSave(data.post);
    }
  }, [data, postSave]);

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
        content="确认删除这篇笔记吗？"
        agree={handleDelete}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          {post ? (
            <Typography variant="h4" component="h2">
              {parseInt(localStorage?.postId) === id
                ? localStorage.postTitle
                : post.title}
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
        <Hr />
        <Grid
          item
          xs={12}
          style={{
            borderColor: "gray",
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            color: "gray",
            marginBottom: 40,
          }}
        >
          {quote}
        </Grid>
      </Grid>
    </>
  );
};

export default PostSingle;

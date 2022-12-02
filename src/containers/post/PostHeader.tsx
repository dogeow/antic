import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AlertDialog from "../../components/AlertDialog";
import Tooltip from "../../components/Tooltip";
import { DELETE_POST_BY_ID } from "../../graphql/post";
import Tags from "./Tags";

dayjs.extend(relativeTime);

const PostHeader = ({ post, edit = true }, props) => {
  const navigate = useNavigate();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_BY_ID);

  const handleEdit = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  const confirmDelete = () => {
    deletePost({ variables: { id: id } });
    navigate("/posts");
  };

  const handleDelete = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  const handleAlertDialogToggle = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  return post ? (
    <>
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Tags post={post} edit={edit} />
        </Grid>
        <Grid item>
          <Tooltip content="发布于 " time={post.created_at} />
        </Grid>
        {post.created_at !== post.updated_at && (
          <Grid item>
            <Tooltip content="更新于 " time={post.updated_at} />
          </Grid>
        )}
        <Grid item xs={12}>
          <span style={{ color: "gray" }}>
            <a onClick={handleEdit}>编辑</a>
            {" | "}
            <a onClick={handleDelete}>删除</a>
          </span>
        </Grid>
      </Grid>
      <AlertDialog
        open={alertDialogOpen}
        handleClose={handleAlertDialogToggle}
        title="删除此文章"
        content="删除后，无法找回"
        agree={confirmDelete}
      />
    </>
  ) : (
    <Grid item xs={12}>
      <Skeleton variant="rectangular" height={20} width="60%" />
    </Grid>
  );
};

export default PostHeader;

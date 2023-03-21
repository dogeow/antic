import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";
import { useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

import AlertDialog from "../../components/AlertDialog";
import Tooltip from "../../components/Tooltip";
import { DELETE_POST_BY_ID } from "../../graphql/post";
import Tags from "./Tags";

dayjs.extend(relativeTime);

const renderTooltip = (content: string, time: string) => (
  <Grid item>
    <Tooltip content={content} time={time} />
  </Grid>
);

const PostHeader = ({ post, edit = true }, props) => {
  const navigate = useNavigate();
  const { id }: Readonly<Params> = useParams();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_BY_ID);

  const handleEdit = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  const confirmDelete = () => {
    deletePost({ variables: { id } });
    navigate("/posts");
  };

  const handleDelete = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  const handleAlertDialogToggle = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  const { created_at, updated_at } = post;
  const isUpdatedAtDifferent = created_at !== updated_at;

  if (!post) {
    return (
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={20} width="60%" />
      </Grid>
    );
  }

  return (
    <>
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Tags post={post} mode="edit" />
        </Grid>
        {renderTooltip("发布于 ", created_at)}
        {isUpdatedAtDifferent && renderTooltip("更新于 ", updated_at)}
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
  );
};

export default PostHeader;

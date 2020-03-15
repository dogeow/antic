import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

const PostEdit = ({post, handleEdit}) => {
  return post ?
    <>
      <Grid item>
        <Tooltip title={post.created_at} placement="top">
          <div>创建于 <time>{moment(post.created_at).fromNow()}</time></div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title={post.updated_at} placement="top">
          <div>更新于 <time>{moment(post.updated_at).fromNow()}</time></div>
        </Tooltip>
      </Grid>
      <Grid item>
        <ButtonGroup size="small" variant="text" color="primary" aria-label="text primary button group">
          <Button onClick={handleEdit}>编辑</Button>
          <Button>删除</Button>
        </ButtonGroup>
      </Grid>
    </>
    :
    <>
      <Grid item xs={12}>
        <Skeleton variant="rect" height={20}/>
      </Grid>
    </>
};

export default PostEdit;

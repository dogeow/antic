import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";

import Tooltip from "../../components/Tooltip";
import Tags from "./Tags";

dayjs.extend(relativeTime);

const PostHeader = ({ post, edit = true }, props) => {
  return post ? (
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
          <a onClick={props.handleEdit}>编辑</a>
          {" | "}
          <a onClick={props.handleDelete}>删除</a>
        </span>
      </Grid>
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Skeleton variant="rectangular" height={20} width="60%" />
    </Grid>
  );
};

export default PostHeader;

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";

import Tooltip from "../../components/Tooltip";
import Tags from "./Tags.js";

dayjs.extend(relativeTime);

const PostHeader = ({ post, edit = true }) => {
  return post ? (
    <Grid container spacing={1}>
      <Grid item>
        <Tooltip content="发布于" time={post.created_at} />
      </Grid>
      {post.created_at !== post.updated_at && (
        <Grid item>
          <Tooltip content="更新于" time={post.updated_at} />
        </Grid>
      )}
      <Tags post={post} edit={edit} />
    </Grid>
  ) : (
    <Grid item xs={12}>
      <Skeleton variant="rectangular" height={20} width="60%" />
    </Grid>
  );
};

export default PostHeader;

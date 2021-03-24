import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Skeleton from "@material-ui/lab/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";

import Tags from "../../components/post/Tags";

dayjs.extend(relativeTime);

const PostHeader = ({ post }) => {
  return post ? (
    <>
      <Grid item>
        <Chip
          label={post?.category?.name || "未分类"}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item>
        <Tags post={post} />
      </Grid>
      <Grid item xs={6}>
        <Tooltip
          title={dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive={true}
        >
          <div style={{ color: "gray" }}>
            发布于<time>{dayjs(post.created_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip
          title={dayjs(post.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive={true}
        >
          <div style={{ color: "gray" }}>
            更新于<time>{dayjs(post.updated_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
    </>
  ) : (
    <Grid item xs={12}>
      <Skeleton variant="rect" height={20} width="60%" />
    </Grid>
  );
};

export default PostHeader;

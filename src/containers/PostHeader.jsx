import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/core/Skeleton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";

import Tags from "../components/Post/Tags";

dayjs.extend(relativeTime);

const PostHeader = ({ post, handleEdit, handleDelete }) => {
  return post ? (
    <>
      <Grid item>
        <Tooltip
          title={dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive="true"
        >
          <div>
            创建于<time>{dayjs(post.created_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip
          title={dayjs(post.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive="true"
        >
          <div>
            更新于<time>{dayjs(post.updated_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Chip
          label={post?.category?.name || "未分类"}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item>
        <Tags tags={post?.tags} />
      </Grid>
      <Grid item>
        <ButtonGroup
          size="small"
          color="primary"
          aria-label="text primary button group"
        >
          <Button onClick={handleEdit}>编辑</Button>
          <Button onClick={handleDelete}>删除</Button>
        </ButtonGroup>
      </Grid>
    </>
  ) : (
    <>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" height={20} width="60%" />
      </Grid>
    </>
  );
};

export default PostHeader;

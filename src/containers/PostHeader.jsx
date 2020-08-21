import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Chip from "@material-ui/core/Chip";
import Tags from "../components/Post/Tags";

const PostHeader = ({ post, handleEdit, handleDelete }) => {
  return post ? (
    <>
      <Grid item>
        <Tooltip
          title={post.created_at}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive
        >
          <div>
            创建于 <time>{moment(post.created_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip
          title={post.updated_at}
          placement="top"
          enterDelay={200}
          disableFocusListener
          disableTouchListener
          TransitionComponent={Zoom}
          arrow
          interactive
        >
          <div>
            更新于 <time>{moment(post.updated_at).fromNow()}</time>
          </div>
        </Tooltip>
      </Grid>
      <Grid item>
        <Chip
          label={post.category || "未分类"}
          color="primary"
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item>
        <Tags tags={post.tags} />
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
        <Skeleton variant="rect" height={20} width="60%" />
      </Grid>
    </>
  );
};

export default PostHeader;

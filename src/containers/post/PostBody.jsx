import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import CodeBlock from "../../components/CodeBlock";

const PostBody = ({ post }) =>
  post?.content ? (
    <ReactMarkdown
      renderers={{ code: CodeBlock }}
      plugins={[gfm]}
      style={{ overflowWrap: " break-word" }}
    >
      {post.content}
    </ReactMarkdown>
  ) : (
    <Skeleton variant="rect" height="60vh" />
  );

export default PostBody;

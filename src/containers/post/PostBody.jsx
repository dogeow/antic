import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkToc from "remark-toc";

import CodeBlock from "../../components/CodeBlock";

const PostBody = ({ post }) =>
  post?.content ? (
    <div style={{ overflowWrap: "break-word" }}>
      <ReactMarkdown renderers={{ code: CodeBlock }} plugins={[gfm, remarkToc]}>
        {post.content}
      </ReactMarkdown>
    </div>
  ) : (
    <Skeleton variant="rect" height="60vh" />
  );

export default PostBody;

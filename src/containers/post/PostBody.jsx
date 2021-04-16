import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkToc from "remark-toc";

import CodeBlock from "../../components/CodeBlock";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  return React.createElement("h" + props.level, { id: text }, props.children);
}

const PostBody = ({ post }) =>
  post?.content ? (
    <div style={{ overflowWrap: "break-word" }}>
      <ReactMarkdown
        renderers={{ code: CodeBlock, heading: HeadingRenderer }}
        plugins={[gfm, remarkToc]}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  ) : (
    <Skeleton variant="rect" height="60vh" />
  );

export default PostBody;

import { Skeleton, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { Children, createElement } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import remarkToc from "remark-toc";

import CodeBlock from "../../components/CodeBlock";

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    "#post a": {
      background:
        theme.palette.mode === "dark"
          ? 'url(\'data:image/svg+xml;utf8, <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>\') no-repeat right top'
          : 'url(\'data:image/svg+xml;utf8, <svg width="24" height="24" fill="black" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>\') no-repeat right top',
      paddingRight: 10,
      backgroundSize: 10,
    },

    "#post a[href^='https://dogeow.com']": {
      backgroundImage: "none",
      paddingRight: 0,
    },
  },
}));

function flatten(text: string, child: string | React.ReactNode) {
  return typeof child === "string" ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = Children.toArray(props.children);
  const text = children.reduce(flatten, "");
  return createElement("h" + props.level, { id: text }, props.children);
}

// 文章正文
const PostBody = ({ post }: { post: Post }) => {
  useStyles();

  return post?.content ? (
    <div id="post" style={{ overflowWrap: "break-word" }}>
      <ReactMarkdown renderers={{ code: CodeBlock, heading: HeadingRenderer }} plugins={[gfm, remarkToc]}>
        {post.content}
      </ReactMarkdown>
    </div>
  ) : (
    <Skeleton variant="rectangular" height="60vh" style={{ marginTop: 10 }} />
  );
};

export default PostBody;

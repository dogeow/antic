import "codemirror/lib/codemirror.css";
import "highlight.js/styles/atom-one-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-chart/dist/tui-chart.css";
import "@toast-ui/editor/dist/i18n/zh-cn";

import Skeleton from "@material-ui/lab/Skeleton";
import chart from "@toast-ui/editor-plugin-chart";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import { Viewer } from "@toast-ui/react-editor";
// import "../toastui-editor-viewer.css";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import php from "highlight.js/lib/languages/php";
import React from "react";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("php", php);

const PostBody = ({ post }) => {
  return (
    <div>
      {post ? (
        <Viewer
          initialValue={post.content}
          useCommandShortcut
          language="zh-CN"
          plugins={[
            [codeSyntaxHightlight, { hljs }],
            colorSyntax,
            tableMergedCell,
            uml,
            chart,
          ]}
        />
      ) : (
        <Skeleton variant="rect" height="60vh" />
      )}
    </div>
  );
};

export default PostBody;

/* eslint-disable */
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import Grid from "@material-ui/core/Grid";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { Editor } from "@toast-ui/react-editor";
import Prism from "prismjs";
import React from "react";

import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-php.js";
import "prismjs/components/prism-bash.js";

const PostCreate = () => {
  const editorRef = React.createRef();

  const handleEditorChange = () => {
    console.log(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <Editor
          ref={editorRef}
          placeholder="输入文档内容"
          initialValue="233"
          previewStyle="vertical"
          height="70vh"
          theme="dark"
          initialEditType="markdown"
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={handleEditorChange}
        />
      </Grid>
    </Grid>
  );
};

export default PostCreate;

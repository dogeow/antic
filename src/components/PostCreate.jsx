// 编辑器
import "@toast-ui/editor/dist/i18n/zh-cn";
// 编辑器 CSS
import "../styles/codemirror.css";
import "../styles/toastui-editor.css";
import "highlight.js/styles/atom-one-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-chart/dist/tui-chart.css";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
// UI
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SaveIcon from "@material-ui/icons/Save";
import chart from "@toast-ui/editor-plugin-chart";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import clsx from "clsx";
import hljs from "highlight.js";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";

import Tags from "./Post/Tags";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("php", php);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

const useStyles = makeStyles(() => ({
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonError: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    marginBottom: -30,
    marginLeft: -62,
    zIndex: 1,
  },
}));

const PostCreate = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  const [id, setId] = useState(0);
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);

  const editorRef = React.createRef();

  // 编辑时，获取文章
  useEffect(() => {
    if (match.params.id) {
      setId(match.params.id);

      axios.get(`posts/${match.params.id}`).then(({ data }) => {
        setPost(data);
      });
    }
  }, [match.params.id]);

  const handlePost = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    // 新增或修改
    const url = id ? `posts/${id}` : "posts";
    const method = id ? "put" : "post";

    axios({
      method,
      url,
      data: {
        title: post.title,
        content: post.content,
      },
    })
      .then(({ data }) => {
        setId(data.id);
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          const { errors } = error.response.data;
          setErrors(errors);
          Swal.fire(
            error.response.data.message,
            (undefined !== errors.title ? errors.title[0] : "") +
              (undefined !== errors.content ? errors.content[0] : ""),
            "error"
          );
          setSuccess(false);
          setLoading(false);
        }
      });
  };

  const handleEditorChange = () => {
    setPost({
      ...post,
      content: editorRef.current.getInstance().getMarkdown(),
    });
  };

  const handleTitleChange = (event) => {
    setPost({ ...post, title: event.target.value });
  };

  const buttonClassname = errors
    ? clsx({ [classes.buttonError]: errors })
    : clsx({ [classes.buttonSuccess]: success });

  const uploadImage = (blob) => {
    const formData = new FormData();

    formData.append("emoji", blob, blob.name);

    return axios.post("/emoji", formData);
  };

  const onAddImageBlob = (blob, callback) => {
    uploadImage(blob)
      .then((response) => {
        callback(response.data.url, "alt text");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryChange = (e, value) => {
    setPost({
      ...post,
      category: value,
    });
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      {/* 标题 */}
      <Grid item xs={12} md={6}>
        <Typography variant="h5" component="h2" onChange={handleTitleChange}>
          {(post && post.title) || ""}
        </Typography>
      </Grid>
      <Grid item xs={3} md={1}>
        {post && (
          <TextField
            value={post.category || "未分类"}
            onChange={handleCategoryChange}
          />
        )}
      </Grid>
      {post && (
        <Grid item xs={9} md={5}>
          {post.tags && <Tags tags={post.tags} />}
        </Grid>
      )}
      {/* 正文 */}
      <Grid item xs={12}>
        {(post || !id) && (
          <Editor
            language="zh-CN"
            usageStatistics={false}
            placeholder="输入文档内容"
            initialValue={(post && post.content) || ""}
            previewStyle="vertical"
            initialEditType="markdown"
            height="70vh"
            useCommandShortcut
            plugins={[
              [codeSyntaxHightlight, { hljs }],
              colorSyntax,
              tableMergedCell,
              uml,
              [chart, chartOptions],
            ]}
            ref={editorRef}
            onChange={handleEditorChange}
            hooks={{
              addImageBlobHook: onAddImageBlob,
            }}
          />
        )}
      </Grid>
      {/* 保存按钮 */}
      <Grid item xs={12} style={{ position: "relative", textAlign: "center" }}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handlePost}
        >
          {success ? <CheckIcon /> : errors ? <ErrorIcon /> : <SaveIcon />}
        </Fab>
        <CircularProgress
          size={68}
          className={classes.fabProgress}
          style={{ visibility: loading ? "visible" : "hidden" }}
        />
      </Grid>
    </Grid>
  );
};

export default PostCreate;

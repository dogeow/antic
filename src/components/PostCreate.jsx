import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useRouteMatch } from "react-router-dom";

// UI
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

// 编辑器
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import uml from "@toast-ui/editor-plugin-uml";
import chart from "@toast-ui/editor-plugin-chart";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import php from "highlight.js/lib/languages/php";

// 编辑器 CSS
import "../codemirror.css";
import "../toastui-editor.css";
import "highlight.js/styles/atom-one-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-chart/dist/tui-chart.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("php", php);

const chartOptions = {
  minWidth: 100,
  maxWidth: 600,
  minHeight: 100,
  maxHeight: 300,
};

const useStyles = makeStyles((theme) => ({
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

  return (
    <Grid container spacing={2} justify="center">
      {/* 标题 */}
      <Grid item xs={4}>
        <Input
          fullWidth
          value={(post && post.title) || ""}
          placeholder="请输入标题"
          inputProps={{ "aria-label": "description" }}
          onChange={handleTitleChange}
        />
      </Grid>
      {/* 正文 */}
      <Grid item xs={12}>
        {(post || !id) && (
          <Editor
            language="zh-CN"
            usageStatistics={false}
            placeholder="请输入。"
            initialValue={(post && post.content) || ""}
            previewStyle="vertical"
            initialEditType="markdown"
            height="70vh"
            useCommandShortcut
            // language="zh-CN"
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

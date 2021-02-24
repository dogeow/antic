import "../styles/editor.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SaveIcon from "@material-ui/icons/Save";
import clsx from "clsx";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import { useRouteMatch } from "react-router-dom";
import gfm from "remark-gfm";
import Swal from "sweetalert2";

import CodeBlock from "../components/CodeBlock";
import Tags from "../components/Post/Tags";
import axios from "../instance/axios";

const useStyles = makeStyles((theme) => {
  const background = theme.palette.background.default;
  const black = theme.palette.common.black;
  const white = theme.palette.common.white;
  const paper = theme.palette.background.paper;

  return {
    "@global":
      theme.palette.type === "dark"
        ? {
            "#editor_md": {
              backgroundColor: background,
              color: white,
            },
            "#editor_html": {
              backgroundColor: background,
              color: white,
            },
            ".rc-md-navigation": {
              backgroundColor: background,
            },
            ".custom-html-style": {
              color: white,
            },
            code: {
              backgroundColor: paper,
            },
            th: { backgroundColor: paper },
          }
        : {
            "#editor_md": {
              backgroundColor: white,
              color: black,
            },
            "#editor_html": {
              backgroundColor: white,
              color: black,
            },
            ".rc-md-navigation": {
              backgroundColor: white,
            },
            ".custom-html-style": {
              color: black,
            },
            code: {
              backgroundColor: "#eee",
            },
            th: { backgroundColor: "#f5f7fa" },
          },
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
  };
});

export default (props) => {
  const classes = useStyles();
  const match = useRouteMatch();

  const [id, setId] = useState(null);
  const [newTagOpen, setNewTagOpen] = useState(false);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [edit, setEdit] = useState(false);

  const editorRef = useRef(null);

  useEffect(() => {
    if (match.params.id) {
      setEdit(true);
      setId(match.params.id);
      axios.get(`posts/${match.params.id}`).then(({ data }) => {
        setPost(data);
      });
    }
  }, [match.params.id]);

  const buttonClassname = errors
    ? clsx({ [classes.buttonError]: errors })
    : clsx({ [classes.buttonSuccess]: success });

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
        category: post.category,
      },
    })
      .then(({ data }) => {
        setId(data.id);
        setSuccess(true);
        setLoading(false);
      })
      .catch(({ data }) => {
        const errors = data.errors;
        setErrors(errors);
        Swal.fire(
          errors.message,
          (undefined !== errors.title ? errors.title[0] : "") +
            (undefined !== errors.content ? errors.content[0] : ""),
          "error"
        );
        setSuccess(false);
        setLoading(false);
        localStorage.removeItem("post");
      });
  };

  const handleCategoryChange = (e) => {
    setPost({
      ...post,
      category: e.target.value,
    });
  };

  const handleDelete = (tag) => {
    window.console.log("delete");
  };

  const handleNew = () => {
    setNewTagOpen(true);
  };

  const handleEditorChange = ({ html, text }) => {
    // const content = handleGetMdValue();
    localStorage.post = text;
    setPost({
      ...post,
      content: text,
    });
  };

  const handleTitleChange = (event) => {
    setPost({ ...post, title: event.target.value });
  };

  const uploadImage = (blob) => {
    const formData = new FormData();

    formData.append("emoji", blob, blob.name);

    return axios.post("/emoji", formData);
  };

  const onAddImageBlob = (blob) => {
    return new Promise((resolve) => {
      uploadImage(blob)
        .then((response) => {
          resolve(response.data.url);
        })
        .catch((error) => {
          window.console.log(error);
        });
    });
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      {/* 标题 */}
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          value={post.title || ""}
          variant="outlined"
          size="small"
          placeholder="请输入标题..."
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid item xs={3} md={2}>
        {post && (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={post.category || ""}
            placeholder="未分类"
            onChange={handleCategoryChange}
          />
        )}
      </Grid>
      <Grid item xs={9} md={6}>
        {post?.tags && (
          <Tags
            tags={post.tags}
            delete={handleDelete}
            new={handleNew}
            newTagOpen={newTagOpen}
            setNewTagOpen={setNewTagOpen}
          />
        )}
      </Grid>
      {/* 正文 */}
      <Grid item xs={12}>
        <MdEditor
          ref={editorRef}
          id="editor"
          name="text"
          value={post.content || (edit && localStorage.post) || ""}
          style={{ height: "70vh" }}
          renderHTML={(text) => (
            <ReactMarkdown renderers={{ code: CodeBlock }} plugins={[gfm]}>
              {text}
            </ReactMarkdown>
          )}
          placeholder="输入文档内容"
          onChange={handleEditorChange}
          config={{
            imageUrl: "https://octodex.github.com/images/minion.png",
            syncScrollMode: ["leftFollowRight", "rightFollowLeft"],
            view: { html: true },
            shortcuts: true,
          }}
          onImageUpload={onAddImageBlob}
        />
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

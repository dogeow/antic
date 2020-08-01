import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import { debounce } from "lodash";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Editor } from "@toast-ui/react-editor";
import clsx from "clsx";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useStore } from "react-redux";
import Input from "@material-ui/core/Input";

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

export default function () {
  const classes = useStyles();
  const store = useStore();
  const [id, setId] = useState();
  const match = useRouteMatch();
  const [post, setPost] = useState();
  const state = store.getState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const buttonClassname = errors
    ? clsx({ [classes.buttonError]: errors })
    : clsx({ [classes.buttonSuccess]: success });

  const editorRef = React.createRef();

  const handleClick = () => {
    editorRef.current.getInstance().exec("Bold");
  };

  const handleFocus = () => {
    console.log("focus!!");
  };

  // 编辑时，获取文章
  useEffect(() => {
    if (match.params.id) {
      setId(match.params.id);

      axios.get(`posts/${match.params.id}`).then(({ data }) => {
        setPost(data);
      });
    }
  }, [match.params.id]);

  const handleChange = debounce(() => {
    const content = editorRef.current.getInstance().getMarkdown();
    localStorage.setItem("saved", content);
    setPost({ ...post, content });
  }, 250);

  const { body } = document;
  if (body) {
    body.style.backgroundColor =
      state.lab.themePaletteType === "dark" ? "#181A1B" : "#FFF";
  }

  const handleTitleChange = (event) => {
    setPost({ ...post, title: event.target.value });
  };

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
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut
          usageStatistics={false}
          ref={editorRef}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        <button type="button" onClick={handleClick}>
          make bold
        </button>
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
}

import * as React from "react";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import Input from "@material-ui/core/Input";
import { useStore } from "react-redux";

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

const GoogleEmbed = (props) => {
  const { attributes, node } = props;
  return <p {...attributes}>Google Embed ({node.data.get("href")})</p>;
};

const Example = () => {
  const store = useStore();
  const state = store.getState();
  const classes = useStyles();
  const match = useRouteMatch();

  const [id, setId] = useState();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);

  const savedText = localStorage.getItem("saved") || "";

  const buttonClassname = errors
    ? clsx({ [classes.buttonError]: errors })
    : clsx({ [classes.buttonSuccess]: success });

  // 编辑时，获取文章
  useEffect(() => {
    if (match.params.id) {
      setId(match.params.id);

      axios.get(`posts/${match.params.id}`).then(({ data }) => {
        setPost(data);
      });
    }
  }, [match.params.id]);

  const handleChange = debounce((value) => {
    localStorage.setItem("saved", value());
    setPost({ ...post, content: value });
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
    let url = id ? `posts/${id}` : "posts";
    let method = id ? "put" : "post";

    axios({
      method: method,
      url: url,
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
          let errors = error.response.data.errors;
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
    <Grid container spacing={2} justify={"center"}>
      {/*标题*/}
      <Grid item xs={4}>
        <Input
          fullWidth
          value={(post && post.title) || ""}
          placeholder="请输入标题"
          inputProps={{ "aria-label": "description" }}
          onChange={handleTitleChange}
        />
      </Grid>
      {/*正文*/}
      <Grid item xs={12}>
        {post && post.content && (
          <Editor
            id="example"
            readOnly={false}
            defaultValue={(id === undefined && savedText) || post.content}
            onSave={(options) => console.log("Save triggered", options)}
            onCancel={() => console.log("Cancel triggered")}
            onChange={handleChange}
            onClickLink={(href) => console.log("Clicked link: ", href)}
            onClickHashtag={(tag) => console.log("Clicked hashtag: ", tag)}
            onShowToast={(message) => window.alert(message)}
            onSearchLink={async (term) => {
              console.log("Searched link: ", term);
              return [
                {
                  title: term,
                  url: "localhost",
                },
              ];
            }}
            uploadImage={(file) => {
              console.log("File upload triggered: ", file);

              // Delay to simulate time taken to upload
              return new Promise((resolve) => {
                setTimeout(
                  () => resolve("http://lorempixel.com/400/200/"),
                  1500
                );
              });
            }}
            getLinkComponent={(node) => {
              if (node.data.get("href").match(/google/)) {
                return GoogleEmbed;
              }
            }}
            dark={state.lab.themePaletteType === "dark"}
            autoFocus
            toc
          />
        )}
      </Grid>
      {/*保存按钮*/}
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

export default Example;

import "styles/editor.css";

import { gql, useLazyQuery } from "@apollo/client";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { green, red } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import CodeBlock from "components/CodeBlock";
import Tags from "components/post/Tags";
import axios from "instance/axios";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import gfm from "remark-gfm";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => {
  const background = theme.palette.background.default;
  const black = theme.palette.common.black;
  const white = theme.palette.common.white;
  const paper = theme.palette.background.paper;

  return {
    "@global":
      theme.palette.mode === "dark"
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

const POST_BY_ID = gql`
  query($id: Int!) {
    post(id: $id) {
      id
      title
      content
      updated_at
      public
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export default ({ post, postSave, postModify, postContentSave, postTitle }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const theId = searchParams.get("id");
  const { state } = useLocation();

  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [getPost, { data }] = useLazyQuery(POST_BY_ID);

  const savePost = React.useCallback(() => {
    if (data) {
      postSave(data.post);
      setCategory(data.post.category);
      setInputValue(data.post.category.name);
    }
  }, [data, postSave]);

  useEffect(() => {
    savePost();
  }, [savePost]);

  useEffect(() => {
    if (theId) {
      setEdit(true);
      setId(theId);
      getPost({
        variables: { id: parseInt(theId) },
      });
    }
  }, [getPost, theId]);

  const getCategories = React.useCallback(() => {
    if (categories.length === 0) {
      axios.get("categories").then(({ data }) => {
        setCategories(data);
      });
    }
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handlePublicChange = (event) => {
    postModify("public", event.target.checked);
  };

  const editorRef = useRef(null);

  const buttonClassname = errors
    ? clsx({ [classes.buttonError]: errors })
    : clsx({ [classes.buttonSuccess]: success });

  const handlePost = () => {
    if (success) {
      alert("已经保存，无需再次保存");
    }

    setSuccess(false);
    setLoading(true);

    // 新增或修改
    const url = id ? `posts/${id}` : "posts";
    const method = id ? "put" : "post";

    axios({
      method,
      url,
      data: {
        title: post.title,
        content: post.content,
        category_id: category?.id,
        tags: post.tags,
        public: post.public,
      },
    })
      .then(({ data }) => {
        setId(data.id);
        postSave(data);
        setLoading(false);
        setSuccess(true);
        if (method === "post") {
          navigate({
            replace: true,
            pathname: `/posts/${data.id}/edit`,
            state: { from: "/posts/create" },
          });
        }
      })
      .catch(({ data }) => {
        const errors = data.errors;
        if (errors) {
          setErrors(errors);
          Swal.fire(
            errors.message,
            (undefined !== errors.title ? errors.title[0] : "") +
              (undefined !== errors.content ? errors.content[0] : ""),
            "error"
          );
          localStorage.removeItem("post");
        }
        setSuccess(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (state && state.from === "/posts/create") {
      setSuccess(true);
    }
  }, [state]);

  const handleEditorChange = ({ html, text }) => {
    if (success) {
      setSuccess(false);
    }
    // const content = handleGetMdValue();
    localStorage.post = text;
    postContentSave(text);
  };

  const handleTitleChange = (event) => {
    postTitle(event.target.value);
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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {/* 头部 */}
      <Grid item xs={12} md={2}>
        {categories.length !== 0 && (
          <Autocomplete
            id="combo-box-demo"
            autoHighlight
            size="small"
            value={category}
            onChange={(event, newValue) => {
              setCategory(newValue);
              if (newValue) {
                setInputValue(newValue.name);
              } else {
                setInputValue("");
              }
            }}
            inputValue={inputValue || ""}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={categories}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <TextField {...params} label="分类" variant="outlined" />
            )}
          />
        )}
      </Grid>
      <Grid item xs={12} md>
        <TextField
          label="标题"
          fullWidth
          value={post.title || ""}
          variant="outlined"
          size="small"
          placeholder="请输入标题..."
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid item xs={12} md>
        <Tags edit={true} post={post} tags={post.tags} />
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
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={!!post.public}
                onChange={handlePublicChange}
                name="public"
                color="primary"
              />
            }
            label="公开"
          />
        </Grid>
        <Grid item>
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
    </Grid>
  );
};

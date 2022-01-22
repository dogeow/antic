import { gql, useMutation, useQuery } from "@apollo/client";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import AlertDialog from "components/AlertDialog";
import React, { useEffect, useState } from "react";
import ReactMarkdownHeading from "react-markdown-heading";
import { Link, useNavigate, useParams } from "react-router-dom";

import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const useStyles = makeStyles((theme) => {
  return {
    toc: {
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
      [theme.breakpoints.down("xl")]: {
        display: "none",
      },
      position: "fixed",
      top: 145,
      right: 10,
      minWidth: 100,
      maxWidth: 350,
      maxHeight: 500,
      background: "grey",
      overflowY: "auto",
      zIndex: 1,
      listStyleType: "none",
      border: "1px solid #aaa",
    },
    displayToc: {
      position: "fixed",
      background: "grey",
      padding: "5px 5px 0 5px",
      top: 110,
      right: 10,
      zIndex: 1,
    },
    "@global":
      theme.palette.mode === "dark"
        ? {
            code: {
              backgroundColor: theme.palette.background.paper,
            },
          }
        : {
            code: {
              backgroundColor: "#eee",
            },
          },
  };
});

const POST_BY_ID = gql`
  query ($id: Int!) {
    post(id: $id) {
      id
      title
      content
      created_at
      updated_at
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

const DELETE_POST_BY_ID = gql`
  mutation ($id: ID!) {
    deletePost(id: $id) {
      title
    }
  }
`;

const PostSingle = ({ postSave }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [tocButtonDisplay, setTocButtonDisplay] = useState(false);
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const [deletePost] = useMutation(DELETE_POST_BY_ID);

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const { data } = useQuery(POST_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  useEffect(() => {
    if (data) {
      setPost(data.post);
      postSave(data.post);

      // 当 TOC 的 heading 大于等于 2 时，才显示 TOC 按钮
      const regexp = RegExp("^#{2}", "mg");
      const content = post.content || "";
      if (Array.from(content.matchAll(regexp)).length >= 2) {
        setTocButtonDisplay(true);
      }
    }
  }, [data, post.content, postSave]);

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  const confirmDelete = () => {
    deletePost({ variables: { id: id } });
    navigate("/posts");
  };

  const handleAlertDialogToggle = () => {
    setAlertDialogOpen(!alertDialogOpen);
  };

  return (
    <>
      {tocButtonDisplay && (
        <div>
          <div className={classes.displayToc} onClick={handleToggleMenu}>
            <FormatListNumberedIcon />
          </div>
          {menu && (
            <div className={classes.toc}>
              <ReactMarkdownHeading
                markdown={post?.content ? post.content : ""}
                hyperlink={true}
              />
            </div>
          )}
        </div>
      )}
      <Grid item xs={12}>
        {post ? (
          <Grid item container alignItems="center" spacing={1}>
            {post?.category && (
              <Grid item>
                <Link to={`/posts?filter[category.name]=${post.category.name}`}>
                  <img
                    src={`${process.env.REACT_APP_CDN_URL}/logo/${post.category.name}.svg`}
                    alt={post.category.name}
                    width="20"
                    height="20"
                  />
                </Link>
              </Grid>
            )}
            <Grid item style={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2">
                {parseInt(localStorage?.postId) === id
                  ? localStorage.postTitle
                  : post.title}
              </Typography>
            </Grid>
            <Grid item>
              <span style={{ color: "gray" }}>
                <a onClick={handleEdit}>编辑</a>
                {" | "}
                <a onClick={handleDelete}>删除</a>
              </span>
            </Grid>
          </Grid>
        ) : (
          <Skeleton variant="rectangular" height={41} width="40%" />
        )}
      </Grid>
      <Grid item container spacing={1}>
        <PostHeader
          edit={false}
          post={post}
          handleEdit={handleEdit}
          handleDelete={handleAlertDialogToggle}
        />
      </Grid>
      <Grid item xs={12}>
        <PostBody post={post} />
      </Grid>
      <AlertDialog
        open={alertDialogOpen}
        handleClose={handleAlertDialogToggle}
        title="删除此文章"
        content="删除后，无法找回"
        agree={confirmDelete}
      />
    </>
  );
};

export default PostSingle;

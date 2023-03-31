import "../../styles/post.css";

import { useQuery } from "@apollo/client";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { Skeleton, Theme, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { Link, Params, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import Hr from "../../components/display/Hr";
import { CDN_URL } from "../../config/services";
import { POST_BY_ID } from "../../graphql/post";
import { getItem } from "../../helpers";
import { postState } from "../../states";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const useStyles = makeStyles(() => {
  return {
    toc: {
      display: "block",
      position: "fixed",
      top: 145,
      right: 10,
      minWidth: 100,
      maxWidth: 350,
      maxHeight: 500,
      overflowY: "auto",
      zIndex: 1,
      listStyleType: "none",
      border: "1px solid #aaa",
    },
    displayToc: {
      position: "fixed",
      padding: "5px 5px 0 5px",
      right: 10,
      zIndex: 1,
    },
  };
});

const PostSingle = () => {
  const classes = useStyles();
  const { id }: Readonly<Params> = useParams();
  const [tocButtonDisplay, setTocButtonDisplay] = useState(false);
  const [post, setPost] = useRecoilState<Post>(postState);
  const [menu, setMenu] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleToggleMenu = () => {
    setMenu(!menu);
  };

  const { data } = useQuery(POST_BY_ID, {
    variables: { id: parseInt(id as string, 10) },
  });

  useEffect(() => {
    if (data) {
      setPost(data.post);

      // 当 TOC 的 heading 大于等于 2 时，才显示 TOC 按钮
      const regexp = RegExp("^#{2}", "mg");
      const content = post.content || "";
      if (Array.from(content.matchAll(regexp)).length >= 2) {
        setTocButtonDisplay(true);
      }
    }
  }, [data, post.content]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop; // 滚动条滚动高度
      if (scrollTop === 0) {
        setPercentage(0);
      } else {
        const clientHeight = document.documentElement.clientHeight; // 可视区域高度
        const scrollHeight = document.documentElement.scrollHeight; // 滚动内容高度
        const remaining = scrollHeight - scrollTop - clientHeight; // 剩余可滚动高度
        setPercentage((scrollHeight - remaining) / scrollHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="tocButton" style={{ "--progress-width": percentage }}></div>
      {tocButtonDisplay && (
        <div>
          <div className={classes.displayToc} onClick={handleToggleMenu}>
            <FormatListNumberedIcon />
          </div>
          {menu && <div className={classes.toc}>此功能正在修复中</div>}
        </div>
      )}
      {post ? (
        <Grid container alignItems="center" spacing={1}>
          {post?.category && (
            <Grid item>
              <Link to={`/posts?filter[category.name]=${post.category.name}`}>
                <img
                  src={`${CDN_URL}/logo/${post.category.name}.svg`}
                  alt={post.category.name}
                  width="20"
                  height="20"
                />
              </Link>
            </Grid>
          )}
          <Grid item style={{ flex: 1 }}>
            <Typography variant="h6" component="h2">
              {getItem("post.id") === id ? getItem("post.title") : post.title}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rectangular" height={41} width="40%" />
      )}
      <Grid item container spacing={1}>
        <PostHeader post={post} edit={false} />
      </Grid>
      <Hr style={{ margin: 10 }} />
      <Grid item xs={12}>
        <PostBody post={post} />
      </Grid>
    </>
  );
};

export default PostSingle;

import { useLazyQuery } from "@apollo/client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Chip, Grid, Hidden, Pagination, PaginationItem, Paper, Skeleton, Theme, Typography } from "@mui/material";
import { PaginationRenderItemParams } from "@mui/material/Pagination/Pagination";
import makeStyles from "@mui/styles/makeStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { CDN_URL } from "../../config/services";
import AllTags from "../../containers/post/AllTags";
import Categories from "../../containers/post/Categories";
import { CATEGORY, POST, POST_LIST, TAG } from "../../graphql/post";
import { setItem } from "../../helpers";
import { postState } from "../../states";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const PostList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useRecoilState<Post[]>(postState);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currPage, setCurrPage] = useState(1);
  const [currCategory, setCurrCategory] = useState<number>();
  const [, setCurrTag] = useState<string>();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [getPosts, { data }] = useLazyQuery(POST_LIST, {
    fetchPolicy: "no-cache",
  });

  const [getPostsWithCategoriesAndTags, { data: allPost }] = useLazyQuery(POST, {
    fetchPolicy: "no-cache",
  });
  const [getPostsByCategory, { data: postsByCategory }] = useLazyQuery(CATEGORY, { fetchPolicy: "no-cache" });

  const [getPostsByTag, { data: postsByTag }] = useLazyQuery(TAG);

  useEffect(() => {
    getPostsWithCategoriesAndTags();
  }, [getPostsWithCategoriesAndTags]);

  useEffect(() => {
    if (allPost) {
      setPosts(allPost.posts.data);
      setCurrPage(allPost.posts.paginatorInfo.currentPage);
      setPageCount(allPost.posts.paginatorInfo.lastPage);
      setCategories(orderBy(allPost.categories, ["count"], ["desc"]));
      setTags(orderBy(allPost.tagsCount, ["count"], ["desc"]));
    }
  }, [allPost]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts.data);
      setCurrPage(data.posts.paginatorInfo.currentPage);
      setPageCount(data.posts.paginatorInfo.lastPage);
    }
  }, [data]);

  useEffect(() => {
    if (postsByCategory) {
      setPosts(postsByCategory.posts.data);
      setCurrPage(postsByCategory.posts.paginatorInfo.currentPage);
      setPageCount(postsByCategory.posts.paginatorInfo.lastPage);
    }
  }, [postsByCategory, setPosts]);

  useEffect(() => {
    if (postsByTag) {
      setPosts(postsByTag.tag.data.map((item) => item.posts[0]));
      setCurrPage(postsByTag.tag.paginatorInfo.currentPage);
      setPageCount(postsByTag.tag.paginatorInfo.lastPage);
    }
  }, [postsByTag, setPosts]);

  const handlePage = (page: number) => {
    getPosts(currCategory ? { variables: { page: page, categoryId: currCategory } } : { variables: { page: page } });
  };

  const changeCategory = (id: number) => {
    setCurrTag(undefined);
    setCurrCategory(id);
    if (id) {
      getPostsByCategory({ variables: { id } });
    } else {
      getPosts();
    }
  };

  const changeTag = (name: string) => {
    setCurrCategory(undefined);
    setCurrTag(name);
    if (name) {
      getPostsByTag({ variables: { name } });
    } else {
      getPosts();
    }
  };

  const handleEnterPost = (item) => {
    setItem("post", {
      id: item.id,
      title: item.title,
    });
    navigate(`/posts/${item.id}`);
  };

  const handlePostCreate = () => {
    navigate("/posts/create");
  };

  return (
    <Grid container spacing={2}>
      <Hidden mdDown>
        <Grid item xs={3} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h5" component="div">
              分类
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Categories changeCategory={changeCategory} categories={categories} />
            </Paper>
          </Grid>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6} container direction="column" spacing={1}>
        <Grid item container justifyContent="space-between">
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" component="div">
              笔记
            </Typography>
            <AddCircleIcon style={{ marginLeft: 5 }} onClick={handlePostCreate} />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                {posts.length
                  ? posts.map((post) => (
                      <Grid item container xs={12} key={post.id} style={{ flexWrap: "nowrap" }}>
                        {/* 分类 */}
                        <Grid item style={{ marginRight: 8 }}>
                          <img
                            src={`${CDN_URL}/logo/${post.category.name}.svg`}
                            alt={post.category.name}
                            width="20"
                            height="20"
                            onClick={() => changeCategory(post?.category.id)}
                          />
                        </Grid>
                        {/* 标题 */}
                        <Grid item style={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" component="h2" onClick={() => handleEnterPost(post)}>
                            {post.title}
                          </Typography>
                        </Grid>
                        {/* 标签 */}
                        <Hidden lgDown>
                          <Grid item>
                            <Grid container spacing={1}>
                              {post.tags.length !== 0 &&
                                post.tags.map((tag) => (
                                  <Grid item key={tag.id}>
                                    <Chip variant="outlined" size="small" label={tag.name} />
                                  </Grid>
                                ))}
                            </Grid>
                          </Grid>
                        </Hidden>
                        <Grid item style={{ marginLeft: 8 }}>
                          {dayjs(post.updated_at).fromNow()}
                        </Grid>
                      </Grid>
                    ))
                  : Array.from(new Array(8)).map((value, index) => (
                      <Grid item container xs={12} spacing={2} key={index}>
                        <Grid item>
                          <Skeleton width={40} height="28px" animation="wave" />
                        </Grid>
                        <Grid item xs>
                          <Skeleton width="100%" height="28px" animation="wave" />
                        </Grid>
                      </Grid>
                    ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Pagination
              page={currPage}
              count={pageCount}
              hidePrevButton={currPage <= 1}
              hideNextButton={currPage >= pageCount}
              renderItem={(item: PaginationRenderItemParams) =>
                pageCount > 0 && (
                  <PaginationItem {...item} disabled={item.page === currPage} onClick={() => handlePage(item.page)} />
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <Grid item xs={3} container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h5" component="div">
              标签
            </Typography>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <AllTags changeTag={changeTag} tags={tags} />
            </Paper>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default PostList;

import { useLazyQuery } from "@apollo/client";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Skeleton from "@material-ui/lab/Skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Categories from "../../containers/post/Categories";
import { CATEGORY, POST_LIST, TAG } from "../../graphql/post";
import AllTags from "../post/AllTags";
dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const PostList = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  const [isSecret, setIsSecret] = useState(false);
  const [pageCount, setPageCount] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [currCategory, setCurrCategory] = useState();
  const history = useHistory();

  const [getPosts, { data }] = useLazyQuery(POST_LIST);
  const [getPostsByCategory, { data: postsByCategory }] = useLazyQuery(
    CATEGORY
  );

  const [getPostsByTag, { data: postsByTag }] = useLazyQuery(TAG);

  const handleChange = () => {
    setIsSecret(!isSecret);
  };

  useEffect(() => getPosts(), [getPosts]);

  useEffect(() => {
    if (data) {
      setPost(data.posts.data);
      setCurrPage(data.posts.paginatorInfo.currentPage);
      setPageCount(data.posts.paginatorInfo.lastPage);
    }
  }, [data]);

  useEffect(() => {
    if (postsByCategory) {
      setPost(postsByCategory.posts.data);
      setCurrPage(postsByCategory.posts.paginatorInfo.currentPage);
      setPageCount(postsByCategory.posts.paginatorInfo.lastPage);
    }
  }, [postsByCategory]);

  useEffect(() => {
    if (postsByTag) {
      setPost(postsByTag.tag.data.map((item) => item.posts[0]));
      setCurrPage(postsByTag.tag.paginatorInfo.currentPage);
      setPageCount(postsByTag.tag.paginatorInfo.lastPage);
    }
  }, [postsByTag]);

  const handlePage = (page) => {
    getPosts(
      currCategory
        ? { variables: { page: page, categoryId: currCategory } }
        : { variables: { page: page } }
    );
  };

  const changeCategory = (id) => {
    setCurrCategory(id);
    getPostsByCategory({ variables: { id } });
  };

  const changeTag = (name) => {
    getPostsByTag({ variables: { name } });
  };

  const handleEnterPost = (item) => {
    localStorage.postTitle = item.title;
    localStorage.postId = item.id;
    history.push(`/posts/${item.id}`);
  };

  const handlePostCreate = () => {
    if (props.post?.id) {
      props.postRemove();
    }
    history.push("/posts/create");
  };

  return (
    <Grid container spacing={2}>
      <Hidden smDown>
        <Grid item xs={3}>
          <h2>分类</h2>
          <Paper className={classes.paper}>
            <Categories changeCategory={changeCategory} />
          </Paper>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <h2>笔记</h2>
            <AddCircleIcon
              style={{ marginLeft: 5 }}
              onClick={handlePostCreate}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isSecret}
                  onChange={handleChange}
                  name="only secret"
                  color="primary"
                />
              }
              label="only secret"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                {post.length !== 0
                  ? post.map((item, index) => (
                      <Grid
                        item
                        container
                        xs={12}
                        key={item.id}
                        spacing={2}
                        alignItems="center"
                        style={{ flexWrap: "nowrap" }}
                      >
                        {/* 分类 */}
                        <Grid item>
                          <img
                            src={`${process.env.REACT_APP_CDN_URL}/logo/${item.category.name}.svg`}
                            alt={item.category.name}
                            width="20"
                            height="20"
                            onClick={() => changeCategory(item?.category.id)}
                          />
                        </Grid>
                        {/* 标题 */}
                        <Grid item style={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            component="h2"
                            onClick={() => handleEnterPost(item)}
                          >
                            {item.title}
                          </Typography>
                        </Grid>
                        {/* 标签 */}
                        <Hidden smDown>
                          <Grid item>
                            <Grid container spacing={1}>
                              {item.tags.length !== 0 &&
                                item.tags.map((tag) => (
                                  <Grid item key={tag.id}>
                                    <Chip
                                      variant="outlined"
                                      size="small"
                                      label={tag.name}
                                    />
                                  </Grid>
                                ))}
                            </Grid>
                          </Grid>
                        </Hidden>
                        <Grid
                          item
                          style={item.public ? null : { color: "red" }}
                        >
                          {dayjs(item.updated_at).fromNow()}
                        </Grid>
                      </Grid>
                    ))
                  : Array.from(new Array(10)).map((index) => (
                      <Grid item container xs={12} spacing={2} key={index}>
                        <Grid item>
                          <Skeleton width={40} height="28px" animation="wave" />
                        </Grid>
                        <Grid item xs>
                          <Skeleton
                            width="100%"
                            height="28px"
                            animation="wave"
                          />
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
              renderItem={(item) =>
                pageCount > 0 && (
                  <PaginationItem
                    {...item}
                    disabled={item.page === currPage}
                    onClick={() => handlePage(item.page)}
                  />
                )
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item xs={3}>
          <h2>标签</h2>
          <Paper className={classes.paper}>
            <AllTags changeTag={changeTag} />
          </Paper>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default PostList;

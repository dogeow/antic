import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import Categories from "../../containers/post/Categories";
import axios from "../../instance/axios";
import AllTags from "../post/AllTags";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
}));

const PostList = (props) => {
  const classes = useStyles();
  const [post, setPost] = useState({});
  const [pageCount, setPageCount] = useState();
  const [currPage, setCurrPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryValue = searchParams.get("filter[category.name]");
    const category =
      categoryValue !== null ? `?filter[category.name]=${categoryValue}` : "";

    const tagValue = searchParams.get("filter[tags.name]");
    const tag = tagValue !== null ? `?filter[tags.name]=${tagValue}` : "";

    axios.get(`posts${category}${tag}`).then(({ data }) => {
      setPost(data);
      setCurrPage(data.current_page);
      setPageCount(data.last_page);
    });
  }, [location]);

  const handlePage = (page) => {
    axios.get(`posts?page[number]=${page}`).then(({ data }) => {
      setPost(data);
      setCurrPage(page);
      setPageCount(data.last_page);
    });
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
            <Categories />
          </Paper>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6}>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <h2>笔记</h2>
          </Grid>
          <Grid item>
            <AddCircleIcon onClick={handlePostCreate} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                {(post.data || Array.from(new Array(6))).map((item, index) => {
                  return item ? (
                    <Grid
                      item
                      container
                      xs={12}
                      key={item.id}
                      spacing={2}
                      alignItems="center"
                    >
                      {/* 分类 */}
                      <Grid item>
                        <Link
                          to={`/posts?filter[category.name]=${item?.category.name}`}
                        >
                          <img
                            src={`${process.env.REACT_APP_CDN_URL}/logo/${item.category.name}.svg`}
                            alt={item.category.name}
                            width="20"
                            height="20"
                          />
                        </Link>
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
                    </Grid>
                  ) : (
                    <Grid item container xs={12} key={index} spacing={2}>
                      <Grid item>
                        <Skeleton width={81} height={28} animation="wave" />
                      </Grid>
                      <Grid item xs>
                        <Skeleton width="100%" height={28} animation="wave" />
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Pagination
              page={currPage}
              count={pageCount}
              hidePrevButton={currPage <= 1}
              hideNextButton={currPage >= post.last_page}
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
            <AllTags />
          </Paper>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default PostList;

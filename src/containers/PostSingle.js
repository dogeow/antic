import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useRouteMatch, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

const PostSingle = () => {
  const [post, setPost] = useState();

  const history = useHistory();
  const match = useRouteMatch();
  const id = parseInt(match.params.id);

  useEffect(() => {
    axios.get(`posts/${id}`).then(response => {
      setPost(response.data);
    });
  }, [id]);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = () => {
    axios.delete(`posts/${id}`);
  };

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item xs={12}>
        {
          post ?
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            :
            <Skeleton variant="rect" height={56}/>
        }
      </Grid>
      <PostHeader
        post={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}/>
      <Grid item xs={12}>
        <PostBody post={post}/>
      </Grid>
    </Grid>
  );
};

export default PostSingle;

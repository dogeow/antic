import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'

const Post = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get('post')
      .then(response => {
        setPost(response.data);
      })
  }, []);

  return (
    <Grid container spacing={2}>
      {
        post.map((item, index) => (
          <Grid item key={index} xs={12}>
            <Link to={`/post/${item.id}`}>
              <Typography variant="h6" component="h2">
                {item.title}
              </Typography>
            </Link>
          </Grid>
        ))
      }
    </Grid>
  )
};

export default Post;

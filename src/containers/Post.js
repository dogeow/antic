import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

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
      <List>
        {
          post.map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <Link to={`/post/${item.id}`}>
              <ListItemText primary={item.title} secondary={item.created_at} />
              </Link>
            </ListItem>
          ))
        }
      </List>
    </Grid>
  )
};

export default Post;

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

const PostList = () => {
  const [post, setPost] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get('posts').then(response => {
      setPost(response.data);
    });
  }, []);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        {
          post.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item>
                  <Avatar>
                    {item.categories.length !== 0 &&
                    item.categories[0].name.substring(0, 4)}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant={'h6'} component={'h2'}>
                    <Link to={`/posts/${item.id}`}>{item.title}</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container spacing={1}>
                    {item.tags.length !== 0 && item.tags.map((tag, index) => (
                      <Grid item key={index}>
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
            </Grid>
          ))
        }
      </Grid>
    </Paper>
  );
};

export default PostList;

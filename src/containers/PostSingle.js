import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouteMatch } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment'
import ReactMarkdown from "react-markdown/with-html";
import CodeBlock from "../components/CodeBlock";
import HeadingBlock from "../components/HeadingBlock";
import Skeleton from '@material-ui/lab/Skeleton';

const PostSingle = () => {
  const [post, setPost] = useState();

  const match = useRouteMatch();
  const id = match.params.id;

  useEffect(() => {
    axios.get(`post/${id}`)
      .then(response => {
        setPost(response.data);
      })
  }, [id]);

  return (
    <Grid container spacing={2}>
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
      <Grid item xs={6}>
        {
          post ?
            <Tooltip title={post.created_at} placement="top">
              <div>创建于 <time>{moment(post.created_at).fromNow()}</time></div>
            </Tooltip>
            :
            <Skeleton variant="rect" height={20}/>
        }
      </Grid>
      <Grid item xs={6}>
        {
          post ?
            <Tooltip title={post.updated_at} placement="top">
              <div>更新于 <time>{moment(post.updated_at).fromNow()}</time></div>
            </Tooltip>
            :
            <Skeleton variant="rect" height={20}/>
        }
      </Grid>
      <Grid item xs={12}>
        {
          post ?
            <ReactMarkdown source={post.content} escapeHtml={false} renderers={{
              code: CodeBlock,
              heading: HeadingBlock
            }}/>
            :
            <Skeleton variant="rect" height={'60vh'}/>
        }
      </Grid>
    </Grid>
  )
};

export default PostSingle;

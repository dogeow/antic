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

const PostSingle = () => {
  const [post, setPost] = useState([]);

  const match = useRouteMatch();
  const id = match.params.id;

  useEffect(() => {
    axios.get(`post/${id}`)
      .then(response => {
        setPost(response.data);
      })
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h2">
          {post.title}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title={post.created_at} placement="top">
          <div>创建于 {moment(post.created_at).fromNow()}</div>
        </Tooltip>
      </Grid>
      <Grid item xs={6}>
        <Tooltip title={post.updated_at} placement="top">
          <div>更新于 {moment(post.updated_at).fromNow()}</div>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <ReactMarkdown source={post.content} escapeHtml={false} renderers={{
          code: CodeBlock,
          heading: HeadingBlock
        }}/>
      </Grid>
    </Grid>
  )
};

export default PostSingle;

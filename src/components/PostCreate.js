import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import MdEditor from 'react-markdown-editor-lite';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CodeBlock from '../components/CodeBlock';
import HeadingBlock from '../components/HeadingBlock';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    marginBottom: -30,
    marginLeft: -62,
    zIndex: 1,
  },
}));

const PostCreate = () => {
  const classes = useStyles();
  const [id, setId] = useState();
  const [title, setTitle] = React.useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handlePost = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    let url = id ? `post/${id}` : 'post';
    let method = id ? 'put' : 'post';
    axios({
      method: method,
      url: url,
      data: {
        title: title,
        content: content,
      },
    }).then(resp => {
      setId(resp.data.id);
      setSuccess(true);
      setLoading(false);
    });
  };

  const renderHTML = (text) => {
    return (
      <ReactMarkdown source={text} escapeHtml={false} renderers={{
        code: CodeBlock,
        heading: HeadingBlock,
      }}/>
    );
  };

  const handleImageUpload = acceptedFiles => {
    return new Promise((resolve, reject) => {
      const file = new Blob([acceptedFiles]);
      const formData = new FormData();
      formData.append('emoji', file, acceptedFiles['name']);
      axios.post('/emoji', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'image/*',
        },
        transformRequest: [
          function(data) {
            return data;
          }],
        onUploadProgress: function(e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            console.log(percentage + '%');  // 上传进度
          }
        },
      }).then(function(resp) {
        resolve(resp.data.url);
      });
    });
  };

  const handleEditorChange = (it, event) => {
    setContent(it.text);
    // console.log('handleEditorChange', it.text, it.html, event);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <Grid container spacing={4} className="demo-wrap">
      <Grid item xs={12} style={{textAlign: 'center'}}>
        <Input
          placeholder="请输入标题"
          inputProps={{'aria-label': 'description'}}
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid xs={12} className="editor-wrap">
        <MdEditor
          value={content}
          style={{height: '500px', width: '100%'}}
          renderHTML={renderHTML}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: true,
            },
            table: {
              maxRow: 5,
              maxCol: 6,
            },
            imageUrl: 'https://octodex.github.com/images/minion.png',
            syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
          }}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </Grid>
      <Grid item xs={12} style={{position: 'relative', textAlign: 'center'}}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handlePost}
        >
          {success ? <CheckIcon/> : <SaveIcon/>}
        </Fab>
        <CircularProgress
          size={68}
          className={classes.fabProgress}
          style={{visibility: loading ? 'visible' : 'hidden'}}/>
      </Grid>
    </Grid>
  );
};

export default PostCreate;

import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import MdEditor from 'react-markdown-editor-lite';
import axios from 'axios';
import CodeBlock from '../components/CodeBlock';
import HeadingBlock from '../components/HeadingBlock';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {green, red} from '@material-ui/core/colors';
import clsx from 'clsx';
import '../markdown.css';
import Swal from 'sweetalert2';
import {useRouteMatch} from 'react-router-dom';

const config = {
  htmlClass: 'none',
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
};

const useStyles = makeStyles(theme => ({
  '@global': {
    '.section-container, .rc-md-editor .drop-wrap, .rc-md-navigation, .rc-md-editor .editor-container .sec-md .input': {
      background: theme.palette.type === 'dark' && '#303030 !important',
      color: theme.palette.type === 'dark' && 'white !important',
    },
    '.rc-md-editor .header-list .list-item:hover': {
      background: theme.palette.type === 'dark'
        ? `${theme.palette.primary.main}`
        : '#f5f5f5',
      color: theme.palette.type === 'dark' && 'white',
    },
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonError: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
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
  const match = useRouteMatch();
  const [id, setId] = useState();
  const [title, setTitle] = React.useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

  useEffect(() => {
    if (match.params.id) {
      setId(match.params.id);

      axios.get(`post/${match.params.id}`).then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    }
  }, [match.params.id]);

  const handlePost = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }

    let url = id ? `posts/${id}` : 'post';
    let method = id ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      data: {
        title: title,
        content: content,
      },
    }).then(({data}) => {
      setId(data.id);
      setSuccess(true);
      setLoading(false);
    }).catch(error => {
      let errors = error.response.data.errors;
      setErrors(errors);
      Swal.fire(error.response.data.message,
        (errors.title !== undefined ? errors.title[0] : '') +
        (errors.content !== undefined ? errors.content[0] : ''),
        'error');
      setSuccess(false);
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

  const buttonClassname = errors ?
    clsx({[classes.buttonError]: errors})
    :
    clsx({[classes.buttonSuccess]: success});

  return (
    <Grid container spacing={2} justify={'center'} className="demo-wrap">
      <Grid item xs={4}>
        <Input
          fullWidth
          value={title}
          placeholder="请输入标题"
          inputProps={{'aria-label': 'description'}}
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid item xs={12} className="editor-wrap">
        <MdEditor
          value={content}
          style={{height: 600, width: '100%'}}
          renderHTML={renderHTML}
          config={config}
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
          {success ? <CheckIcon/> : (errors ? <ErrorIcon/> : <SaveIcon/>)}
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

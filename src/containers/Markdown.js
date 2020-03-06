import React, { useState, useEffect } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown/with-html'
import MdEditor from 'react-markdown-editor-lite'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CodeBlock from "../components/CodeBlock";
import HeadingBlock from "../components/HeadingBlock";
import makeStyles from "@material-ui/core/styles/makeStyles";

const PLUGINS = undefined;

const useStyles = makeStyles(theme => ({
  '@global': {
    '.section-container, .rc-md-editor .editor-container .sec-md .input': {
      background: theme.palette.type === 'dark' && '#303030',
      color: theme.palette.type === 'dark' && 'white',
    },
  },
}));

const Demo = () => {
  useStyles();
  const [mdEditor, setMdEditor] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    axios.get('post/1').then(resp => {
      setMdEditor(resp.data.content);
      setId(resp.data.id);
    })
  }, []);

  const handlePost = () => {
    axios.put(`post/${id}`, {
      content: mdEditor
    }).then(resp => {
      console.log(resp);
    })
  };

  const renderHTML = (text) => {
    return (
      <ReactMarkdown source={text} escapeHtml={false} renderers={{
        code: CodeBlock,
        heading: HeadingBlock
      }}/>
    )
  };

  const handleImageUpload = acceptedFiles => {
    return new Promise((resolve, reject) => {
      const file = new Blob([acceptedFiles]);
      const formData = new FormData();
      formData.append('emoji', file, acceptedFiles['name']);
      axios.post('/emoji', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': "image/*"
        },
        transformRequest: [function (data) {
          return data
        }],
        onUploadProgress: function (e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            console.log(percentage + '%');  // 上传进度
          }
        }
      }).then(function (resp) {
        resolve(resp.data.url);
      });
    });
  };

  const handleEditorChange = (it, event) => {
    setMdEditor(it.text);
    // console.log('handleEditorChange', it.text, it.html, event);
  };

  return (
    <div className="demo-wrap">
      <div className="editor-wrap">
        <MdEditor
          value={mdEditor}
          style={{height: '700px', width: '100%'}}
          renderHTML={renderHTML}
          plugins={PLUGINS}
          config={{
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
          }}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div style={{paddingTop: 20, textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={handlePost}>提交</Button>
      </div>
    </div>
  );
};

export default Demo;

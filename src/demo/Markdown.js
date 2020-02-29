import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown/with-html'
import MdEditor from 'react-markdown-editor-lite'
import apiMd from './api.md';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock";

const PLUGINS = undefined;

const Demo = () => {
  const [mdEditor, setMdEditor] = useState(undefined);

  useEffect(() => {
    axios.get('post').then(resp => {
      setMdEditor(resp.data.content)
    })
  }, []);

  const handlePost = () => {
    axios.post('post', {
      content: mdEditor.getMdValue()
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

  const handleEditorChange = (it, event) => {
    // console.log('handleEditorChange', it.text, it.html, event);
  };
  
  return (
    <div className="demo-wrap">
      <div className="editor-wrap">
        <MdEditor
          value={mdEditor}
          style={{height: '500px', width: '100%'}}
          renderHTML={renderHTML}
          plugins={PLUGINS}
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
        />
      </div>
      <div><Button onClick={handlePost}>提交</Button></div>
    </div>
  );
}

export default Demo;

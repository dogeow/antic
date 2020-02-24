import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import apiMd from './api.md'
import CodeBlock from "./CodeBlock";
import HeadingBlock from "./HeadingBlock";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const Markdown = () => {
  const [markdown, setMarkdown] = useState('');
  fetch(apiMd)
    .then(response => {
      return response.text()
    })
    .then(text => {
      setMarkdown(text);
    });

  return (
    <div>
      <ReactMarkdown source={markdown} escapeHtml={false} renderers={{
        code: CodeBlock,
        heading: HeadingBlock
      }}/>
      <Editor/>
    </div>
  )
};

export default Markdown

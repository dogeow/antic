import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {Viewer} from '@toast-ui/react-editor';
import codeSyntaxHightlight
  from '@toast-ui/editor-plugin-code-syntax-highlight';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import uml from '@toast-ui/editor-plugin-uml';
import chart from '@toast-ui/editor-plugin-chart';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-chart/dist/tui-chart.css';
import '@toast-ui/editor/dist/i18n/zh-cn';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);

const PostBody = ({post}) => {
  return <div>
    {
      post ?
        <Viewer
          initialValue={post.content}
          useCommandShortcut={true}
          language="zh-CN"
          plugins={[
            [codeSyntaxHightlight, {hljs}],
            colorSyntax,
            tableMergedCell,
            uml,
            chart]}
        />
        :
        <Skeleton variant="rect" height={'60vh'}/>
    }
  </div>;
};

export default PostBody;

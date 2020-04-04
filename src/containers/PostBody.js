import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import MarkdownIt from 'markdown-it';
import emoji from 'markdown-it-emoji';
import task from 'markdown-it-task-lists';
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const PostBody = ({post}) => {
  const md = new MarkdownIt({
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) +
        '</code></pre>';
    },
  });

  md.use(anchor, {
    level: [2, 3, 4],
    permalink: true,
    permalinkClass: 'header-anchor',
    permalinkSymbol: '¶',
    permalinkBefore: true,
  });
  md.use(emoji);
  md.use(task, {enabled: true, label: true, labelAfter: true});
  md.use(markdownItTocDoneRight, {
    level: [2, 3, 4],
  });

  return (
    <div>
      {
        post ?
          <div dangerouslySetInnerHTML={{__html: md.render(post.content)}}/>
          :
          <Skeleton variant="rect" height={'60vh'}/>
      }
    </div>
  );
};

export default PostBody;

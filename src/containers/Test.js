import React from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import {Editor} from '@toast-ui/react-editor';
import 'highlight.js/styles/atom-one-dark.css';
import codeSyntaxHightlight
  from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import 'tui-color-picker/dist/tui-color-picker.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import uml from '@toast-ui/editor-plugin-uml';
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import '@toast-ui/editor/dist/i18n/zh-cn';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);

const Test = () => {
  return (
    <Editor
      placeholder='Please enter text.'
      initialValue={
        `![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**bold** *italic* ~~strikethrough~~
<span style="color:#e11d21;">Color Syntax</span>
[link](https://nhn.github.io/tui.editor/)

---
horizontal line
***

> block quote
>> block quote (2 depth)
>>> block quote (3 depth)

* list
    * list indented
1. ordered
2. list
    1. ordered list
    2. indented

- [ ] task
- [x] list completed

\`inline code\`

    code block
\`\`\`js
console.log("fenced code block");
\`\`\`
<pre>**HTML block**</pre>

| table | head |
| ----  | ---- |
| table | body |

\`\`\`chart
,category1,category2
Jan,21,23
Feb,31,17

type: column
title: Monthly Revenue
x.title: Amount
y.title: Month
y.min: 1
y.max: 40
y.suffix: $
\`\`\`
\`\`\`js
console.log('foo')
\`\`\`
\`\`\`javascript
console.log('bar')
\`\`\`
\`\`\`html
<div id="editor"><span>baz</span></div>
\`\`\`
\`\`\`wrong
[1 2 3]
\`\`\`
\`\`\`clojure
[1 2 3]
\`\`\`
| @cols=2:merged |
| --- | --- |
| table | table2 |
\`\`\`uml
partition Conductor {
  (*) --> "Climbs on Platform"
  --> === S1 ===
  --> Bows
}

partition Audience #LightSkyBlue {
  === S1 === --> Applauds
}

partition Conductor {
  Bows --> === S2 ===
  --> WavesArmes
  Applauds --> === S2 ===
}

partition Orchestra #CCCCEE {
  WavesArmes --> Introduction
  --> "Play music"
}
\`\`\`
`
      }
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      language="zh-CN"
      plugins={[
        [codeSyntaxHightlight, {hljs}],
        colorSyntax,
        tableMergedCell,
        uml,
        chart]}
    />
  );
};

export default Test;

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  jsx,
  javascript,
  php,
  bash,
  css,
  json,
  nginx,
} from 'react-syntax-highlighter/dist/esm/languages/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('nginx', nginx);

const CodeBlock = ({language, value}) => {
  return (
    <figure className="highlight">
      <SyntaxHighlighter language={language} style={atomDark}>
        {value}
      </SyntaxHighlighter>
    </figure>
  );
};

export default CodeBlock;

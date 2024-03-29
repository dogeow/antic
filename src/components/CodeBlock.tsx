import React, { useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮的语言
import { javascript, jsx } from "react-syntax-highlighter/dist/esm/languages/prism";
// 设置高亮样式
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language = "php", value }) => {
  useEffect(() => {
    // 注册要高亮的语法，
    // 注意：如果不设置打包后供第三方使用是不起作用的
    SyntaxHighlighter.registerLanguage("jsx", jsx);
    SyntaxHighlighter.registerLanguage("javascript", javascript);
  }, []);

  return (
    <figure className="highlight">
      <SyntaxHighlighter language={language} style={coy}>
        {value}
      </SyntaxHighlighter>
    </figure>
  );
};

export default CodeBlock;

import React from "react";
import { useSelector } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = (props) => {
  const { language, value } = props;

  const paletteMode = useSelector((state) => state.lab.paletteMode);

  return (
    <SyntaxHighlighter
      language={language}
      style={
        paletteMode === "dark"
          ? {
              ...materialDark,
              'code[class*="language-"]': {
                ...materialDark['code[class*="language-"]'],
                background: "black",
              },
              'pre[class*="language-"]': {
                ...materialDark['pre[class*="language-"]'],
                background: "black",
              },
            }
          : materialDark
      }
    >
      {value ? value : ""}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

import * as React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRecoilState } from "recoil";

import { paletteModeState } from "../states";

const CodeBlock = (props) => {
  const { language, value } = props;

  const [paletteMode] = useRecoilState(paletteModeState);

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

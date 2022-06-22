import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import React from "react";

import axios from "../instance/axios";

const languages = ["ko", "tr", "ms", "th", "tw"];

const Translate = () => {
  const [zhCnText, setZhCnText] = React.useState("");
  const [mulText, setMulText] = React.useState({});

  const handleTranslate = () => {
    if (zhCnText === "") {
      alert("请输入");
      return;
    }

    languages.forEach((language) => {
      axios
        .jsonp(
          "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=" +
            language +
            "&q=" +
            zhCnText
        )
        .then((resp) => {
          console.log(resp);
          setMulText({ ...mulText, language: resp[0][0] });
        });
    });
  };

  const handleChange = (event) => {
    setZhCnText(event.target.value);
  };

  return (
    <div>
      <Input onChange={handleChange}></Input>
      <Button onClick={handleTranslate}>翻译</Button>
      {/* <div>{{ mulText.["zh-tw"] }}</div>*/}
      {/* <div>{{ mulText["ko"] }}</div>*/}
      {/* <div>{{ mulText["ms"] }}</div>*/}
      {/* <div>{{ mulText["th"] }}</div>*/}
      {/* <div>{{ mulText["tr"] }}</div>*/}
    </div>
  );
};

export default Translate;

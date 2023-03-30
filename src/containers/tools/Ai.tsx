import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";

import ClipboardButton from "../../components/ClipboardButton";
import { snackState } from "../../states";

const useStyles = makeStyles((theme) => ({
  response: {
    width: "100%",
    textAlign: "left",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    minHeight: "50vh",
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function processMatch(jsonObj) {
  const { choices } = jsonObj;
  const { delta } = choices[0];

  if (delta.content) {
    return delta.content;
  }
  return "";
}

const Ai = () => {
  const classes = useStyles();
  const [content, setContent] = React.useState("");
  const [response] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [responseChunks, setResponseChunks] = useState([]);
  const [, setSnack] = useRecoilState(snackState);

  const handleClick = () => {
    setSnack({
      message: "复制成功",
    });
  };

  const getClipboardButton = (value) => {
    return (
      <div>
        点击图标复制
        <ClipboardButton text={value} handleClick={handleClick} />
      </div>
    );
  };

  const handleInputValueChange = (event) => {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
    setContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("https://api.dogeow.com/ai", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const reader = response.body.getReader();

        let remainingBytes = new Uint8Array();

        const decoder = new TextDecoder();

        while (true) {
          console.log("----");
          const chunks = [];
          const { done, value } = await reader.read();
          if (done) break;

          const dataBytes = new Uint8Array([...remainingBytes, ...value]);
          const decodedText = decoder.decode(dataBytes, { stream: true });

          const regex = /data:\s*({.*]})/gm;
          let match;
          const matches = [];

          while ((match = regex.exec(decodedText))) {
            const jsonStr = match[1];
            const jsonObj = JSON.parse(jsonStr);
            matches.push(jsonObj);
          }
          const numMatches = matches.length;
          const lastIndex = regex.lastIndex;
          if (numMatches < decodedText.length - 1) {
            remainingBytes = dataBytes.slice(lastIndex);
          } else {
            remainingBytes = new Uint8Array();
          }
          // 处理所有匹配
          matches.forEach((match) => {
            const content = processMatch(match);
            chunks.push(content);
            setResponseChunks(chunks); // 更新响应数据列表
          });
        }

        console.log("Data Stream Complete!");
      } else {
        console.error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 将所有数据块合并成一个字符串
  const responseString = responseChunks.join("");

  return (
    <Grid container spacing={1} maxWidth={"sm"} minWidth={"xs"} alignItems={"center"} justifyContent={"center"}>
      <Grid item xs={12}>
        <Alert severity="error">KEY 额度用完了，等绑定信用卡后再用吧。</Alert>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="问题"
          required
          value={content}
          fullWidth
          variant="outlined"
          rows={3}
          multiline
          autoFocus={true}
          placeholder={"请输入问题，最短2个字，最多255个字。"}
          onChange={handleInputValueChange}
          helperText={errorMessage}
          InputLabelProps={errorMessage !== "" ? { shrink: true } : {}}
          error={errorMessage !== ""}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color={isLoading ? undefined : "primary"}
          disabled={isLoading}
          onClick={handleSubmit}
          fullWidth
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isLoading ? "请等待..." : "发送"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.response} variant="body1" style={{ padding: 14, whiteSpace: "pre-wrap" }}>
          {responseString}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {getClipboardButton(response)}
      </Grid>
    </Grid>
  );
};

export default Ai;

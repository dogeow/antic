import { Button, ButtonGroup, Grid, TextareaAutosize } from "@mui/material";
import * as React from "react";

const emojis = ["❗️", "‼️", "✔️️"];

export default function Copywriting() {
  const [text, setText] = React.useState("");

  const textInput = React.createRef();

  const handleClick = (emoji) => {
    setText(text + emoji);
    textInput.current.focus();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <TextareaAutosize
          ref={textInput}
          minRows={6}
          placeholder="请输入..."
          value={text}
          style={{ width: 272, fontFamily: "auto" }}
          aria-label="CopyWriting"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{ fontSize: "2em", textAlign: "center" }}>
        <ButtonGroup aria-label="outlined button group">
          {emojis.map((emoji) => (
            <Button
              onClick={() => handleClick(emoji)}
              style={{ fontFamily: "auto" }}
              key={emoji}
            >
              {emoji}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

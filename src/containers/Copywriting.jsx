import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React from "react";

const emojis = ["💦", "🔥", "✨", "🙀", "💅", "❗️", "‼️"];

export default function Copywriting() {
  const [text, setText] = React.useState("233");

  const textInput = React.createRef();

  const handleClick = (emoji) => {
    setText(text + emoji);
    textInput.current.focus();
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <TextareaAutosize
          aria-label="empty textarea"
          rowsMin={6}
          ref={textInput}
          placeholder="Empty"
          value={text}
          style={{ width: 272, fontFamily: "auto" }}
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

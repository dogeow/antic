import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const emojis = ["💦", "🔥", "✨", "🙀", "💅", "❗️", "‼️"];

export default function Copywriting() {
  const [text, setText] = React.useState("233");
  const handleClick = (emoji) => {
    setText(text + emoji);
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
          placeholder="Empty"
          value={text}
          style={{ width: 272, fontFamily: "auto" }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{ fontSize: "2em", textAlign: "center" }}>
        <ButtonGroup aria-label="outlined button group">
          {emojis.map((emoji) => (
            <Button onClick={() => handleClick(emoji)} key={emoji}>
              {emoji}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

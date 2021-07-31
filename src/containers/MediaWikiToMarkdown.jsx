import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React, { useState } from "react";

import axios from "../instance/axios";

export default () => {
  const [mediawiki, setMediawiki] = useState("");
  const [markdown, setMarkdown] = useState("");

  const change = () => {
    axios
      .post("/mediawiki-to-markdown", {
        mediawiki,
      })
      .then(({ data }) => {
        setMarkdown(data);
      });
  };

  const changeMarkdown = (e) => {
    setMarkdown(e.target.value);
  };

  const changeMediawiki = (e) => {
    setMediawiki(e.target.value);
  };

  return (
    <Grid container spacing={1} style={{ height: "80vh" }}>
      <Grid item xs={5}>
        <TextareaAutosize
          name="mediawiki"
          style={{ width: "100%", height: "100%" }}
          value={mediawiki}
          onChange={changeMediawiki}
        />
      </Grid>
      <Grid item xs={2} style={{ alignSelf: "center", textAlign: "center" }}>
        <ArrowForwardIcon onClick={change} />
      </Grid>
      <Grid item xs={5}>
        <TextareaAutosize
          name="markdown"
          style={{ width: "100%", height: "100%" }}
          value={markdown}
          onChange={changeMarkdown}
        />
      </Grid>
    </Grid>
  );
};

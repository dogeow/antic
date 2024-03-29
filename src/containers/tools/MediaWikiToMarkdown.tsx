import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useEffect, useState } from "react";

import axios from "../../instance/axios";

export default () => {
  const [mediawiki, setMediawiki] = useState("");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (mediawiki === "") {
      return;
    }

    axios
      .post("/mediawiki-to-markdown", {
        mediawiki,
      })
      .then(({ data }) => {
        setMarkdown(data);
      });
  }, [mediawiki]);

  const changeMediawiki = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMediawiki(e.target.value);
  };

  const changeMarkdown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  return (
    <Grid container spacing={1} style={{ height: "80vh" }}>
      <Grid item xs={5}>
        <TextareaAutosize
          name="mediawiki"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          value={mediawiki}
          onChange={changeMediawiki}
        />
      </Grid>
      <Grid item xs={2} style={{ alignSelf: "center", textAlign: "center" }}>
        <ArrowForwardIcon />
      </Grid>
      <Grid item xs={5}>
        <TextareaAutosize
          name="markdown"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          value={markdown}
          onChange={changeMarkdown}
        />
      </Grid>
    </Grid>
  );
};

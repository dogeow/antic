import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as React from "react";
import { useState } from "react";

const AddSuffix = () => {
  const [suffix, setSuffix] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const changeSource = (e) => {
    setSource(e.target.value);
    const target = e.target.value
      .split("\n")
      .map((line) => {
        if (line !== "") {
          return line + suffix;
        }
      })
      .join("\n");
    setTarget(target);
  };

  const changeSuffix = (e) => {
    setSuffix(e.target.value);
    const target = source
      .split("\n")
      .map((line) => {
        if (line !== "") {
          return line + e.target.value;
        }
      })
      .join("\n");
    setTarget(target);
  };

  return (
    <div>
      <div>
        <TextareaAutosize name="suffix" value={suffix} onChange={changeSuffix} placeholder="后缀" />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <TextareaAutosize name="mediawiki" value={source} onChange={changeSource} placeholder="源内容" />
        </Grid>
        <Grid item xs={2} style={{ alignSelf: "center", textAlign: "center" }}>
          <ArrowForwardIcon />
        </Grid>
        <Grid item xs={5}>
          <TextareaAutosize name="markdown" value={target} placeholder="目标内容" />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddSuffix;

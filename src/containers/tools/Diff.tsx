import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";

function keepSpace(str: string) {
  return str.replace(/(?<=[a-zA-Z0-9])(?=[\u4e00-\u9fa5])|(?<=[\u4e00-\u9fa5])(?=[a-zA-Z0-9])/g, " ");
}

export default () => {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      if (oldValue) {
        setOldValue(keepSpace(oldValue));
      }
      if (newValue) {
        setNewValue(keepSpace(oldValue));
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <div>
        <Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
        中英文加上空格
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <textarea
            value={oldValue}
            placeholder="请输入要对比的内容"
            onChange={(e) => {
              if (checked) {
                setOldValue(keepSpace(e.target.value));
              } else {
                setOldValue(e.target.value);
              }
            }}
            style={{ width: "100%", height: "40vh", overflow: "auto" }}
          />
        </Grid>
        <Grid item xs={6}>
          <textarea
            value={newValue}
            placeholder="请输入要对比的内容"
            onChange={(e) => {
              if (checked) {
                setNewValue(keepSpace(e.target.value));
              } else {
                setNewValue(e.target.value);
              }
            }}
            style={{ width: "100%", height: "40vh", overflow: "auto" }}
          />
        </Grid>
      </Grid>
      <div style={{ overflow: "auto", height: "40vh" }}>
        <ReactDiffViewer oldValue={oldValue} newValue={newValue} splitView={true} />
      </div>
    </div>
  );
};

import Grid from "@mui/material/Grid";
import React from "react";
import ReactDiffViewer from "react-diff-viewer";

export default () => {
  const [oldValue, setOldValue] = React.useState("");
  const [newValue, setNewValue] = React.useState("");

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <textarea
            value={oldValue}
            onChange={(e) => setOldValue(e.target.value)}
            style={{ width: "100%", height: "40vh", overflow: "auto" }}
          />
        </Grid>
        <Grid item xs={6}>
          <textarea
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            style={{ width: "100%", height: "40vh", overflow: "auto" }}
          />
        </Grid>
      </Grid>
      <div style={{ overflow: "auto", height: "40vh" }}>
        <ReactDiffViewer
          oldValue={oldValue}
          newValue={newValue}
          splitView={true}
        />
      </div>
    </div>
  );
};

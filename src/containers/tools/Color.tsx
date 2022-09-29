import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const Color = () => {
  const [color, setColor] = useState("rgb(0,0,0)");

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <Grid container component={Container} maxWidth="xs" spacing={2}>
      <Grid item xs={12}>
        <TextField label="Hex RGB" value={color.colorHex()} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="RGB" value={color} onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            background: color,
            width: 80,
            height: 80,
            margin: "0 auto",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            background: color,
            width: 100,
            height: 1,
            margin: "0 auto",
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ background: color, width: 1, height: 100, margin: "0 auto" }} />
      </Grid>
    </Grid>
  );
};

export default Color;

import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export default (props) => (
  <TextField
    id="name"
    label="昵称"
    name="name"
    value={props.name}
    autoComplete="name"
    variant="outlined"
    fullWidth
    required
    placeholder="4-16个字符（一个中文为 2 个字符）"
    helperText={props.error?.[0]}
    error={!!props.error}
    InputLabelProps={props.error && { shrink: true }}
    onChange={(e) => props.onSetName(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    }}
  />
);

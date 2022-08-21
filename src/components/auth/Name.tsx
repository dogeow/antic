import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default (props) => (
  <TextField
    id="name"
    name="name"
    label="昵称"
    value={props.name}
    autoComplete="name"
    variant="outlined"
    required
    fullWidth
    placeholder="4-16个字符（一个中文为 2 个字符）"
    helperText={props.error?.[0]}
    InputLabelProps={props.error && { shrink: true }}
    onChange={(e) => props.onSetName(e.target.value)}
    error={!!props.error}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    }}
  />
);

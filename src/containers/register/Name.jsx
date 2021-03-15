import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
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
    placeholder={props.error?.[0]}
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

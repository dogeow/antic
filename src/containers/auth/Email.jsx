import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    id="email"
    label="Email 地址"
    name="email"
    value={props.email}
    autoComplete="email"
    onChange={(e) => props.setEmail(e.target.value)}
    error={!!props.error}
    placeholder={props.error?.[0]}
    InputLabelProps={props.error && { shrink: true }}
    helperText={props.error?.[0]}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <MailOutlineIcon />
        </InputAdornment>
      ),
    }}
  />
);

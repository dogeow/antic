import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default (props) => (
  <TextField
    id="email"
    name="email"
    label="Email 地址"
    value={props.email}
    required
    fullWidth
    variant="outlined"
    autoComplete="email"
    placeholder="username@example.com"
    onChange={(e) => props.setEmail(e.target.value)}
    error={!!props.error}
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

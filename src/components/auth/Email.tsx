import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    id="email"
    name="email"
    label="Email 地址"
    value={props.email}
    autoComplete="email"
    placeholder="username@example.com"
    onChange={(e) => props.setEmail(e.target.value)}
    InputLabelProps={props.error && { shrink: true }}
    helperText={props.error?.[0]}
    error={!!props.error}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <MailOutlineIcon />
        </InputAdornment>
      ),
    }}
  />
);

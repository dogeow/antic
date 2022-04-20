import SmsIcon from "@mui/icons-material/Sms";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    name="verify"
    value={props.verify}
    label="验证码"
    type="text"
    id="verify"
    autoComplete="current-verify"
    onChange={(e) => props.setVerify(e.target.value)}
    error={!!props.error}
    InputLabelProps={props.error && { shrink: true }}
    helperText={props.error?.[0]}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SmsIcon className="pointer" />
        </InputAdornment>
      ),
    }}
  />
);

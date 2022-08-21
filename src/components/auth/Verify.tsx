import SmsIcon from "@mui/icons-material/Sms";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default (props) => (
  <TextField
    type="text"
    id="verify"
    name="verify"
    label="验证码"
    value={props.verify}
    required
    fullWidth
    variant="outlined"
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

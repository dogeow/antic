import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SmsIcon from "@material-ui/icons/Sms";
import React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    name="verify"
    value={props.verify}
    label="验证码"
    type={props.displayPassword ? "text" : "password"}
    id="verify"
    autoComplete="current-verify"
    onChange={(e) => props.setVerify(e.target.value)}
    error={!!props.error}
    placeholder={props.error?.[0]}
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

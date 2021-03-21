import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import React from "react";

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& p": {
      color: "green",
    },
  },
})(TextField);

export default (props) =>
  props.phoneNumber.length === 11 && props.sentPhoneSuccess ? (
    <ValidationTextField
      variant="outlined"
      required
      fullWidth
      id="phone_number"
      label="手机号码"
      name="phone_number"
      value={props.phoneNumber}
      autoComplete="phone_number"
      onChange={(e) => props.setPhoneNumber(e.target.value)}
      placeholder={props.error?.[0]}
      InputLabelProps={props.error && { shrink: true }}
      error={!!props.error}
      helperText={props.error?.[0] || "已发送验证码，五分钟内有效"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIphoneIcon />
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      variant="outlined"
      required
      fullWidth
      id="phone_number"
      label="手机号码"
      name="phone_number"
      value={props.phoneNumber}
      autoComplete="phone_number"
      onChange={(e) => props.setPhoneNumber(e.target.value)}
      error={!!props.error}
      placeholder={props.error?.[0]}
      InputLabelProps={props.error && { shrink: true }}
      helperText={props.error?.[0]}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PhoneIphoneIcon />
          </InputAdornment>
        ),
      }}
    />
  );

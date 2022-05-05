import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    fullWidth
    name="password_confirmation"
    value={props.passwordConfirmation}
    label="确认密码"
    type={props.displayPassword ? "text" : "password"}
    id="password_confirmation"
    autoComplete="current-password-confirmation"
    onChange={(e) => props.setPasswordConfirmation(e.target.value)}
    error={!!props.error}
    InputLabelProps={props.error && { shrink: true }}
    helperText={props.error?.[0]}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          {props.displayPassword ? (
            <VisibilityIcon
              onClick={props.handlePassword}
              className="pointer"
            />
          ) : (
            <VisibilityOffIcon
              onClick={props.handlePassword}
              className="pointer"
            />
          )}
        </InputAdornment>
      ),
    }}
  />
);

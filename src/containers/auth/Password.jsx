import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React from "react";

export default (props) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    name="password"
    value={props.password}
    label="密码"
    type={props.displayPassword ? "text" : "password"}
    id="password"
    autoComplete="current-password"
    onChange={(e) => props.setPassword(e.target.value)}
    error={!!props.error}
    placeholder={props.error?.[0] || "8个字符以上"}
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

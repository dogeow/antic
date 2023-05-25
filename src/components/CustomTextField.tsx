import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import * as React from "react";

interface CustomTextFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error: object;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  [key: string]: any;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  error,
  onChange,
  icon,
  ...rest
}) => (
  <TextField
    id={id}
    name={id}
    label={label}
    value={value}
    required
    fullWidth
    variant="outlined"
    autoComplete={id}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    InputLabelProps={error && { shrink: true }}
    error={!!error}
    helperText={error?.[0]}
    InputProps={{
      startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
    }}
    {...rest}
  />
);

export default CustomTextField;

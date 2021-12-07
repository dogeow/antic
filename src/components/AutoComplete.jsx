// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
      style={{ width: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      autoComplete
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={props.options}
      defaultValue=""
      renderInput={(params) => (
        <TextField {...params} label="分类" size="small" variant="outlined" />
      )}
    />
  );
}

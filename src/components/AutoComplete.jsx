// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={props.options}
      inputValue={props.value}
      onInputChange={(e, value, reason) => {
        if (reason === "reset") {
          return;
        }
        props.onHandleCategoryChange(e, value);
      }}
      renderInput={(params) => (
        <TextField {...params} label="分类" size="small" variant="outlined" />
      )}
    />
  );
}

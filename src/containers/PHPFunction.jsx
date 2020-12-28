import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useState } from "react";

const NoMatch = () => {
  const [value, setValue] = useState("");
  const [phpFunction, setPhpFunction] = useState({});

  const handleClickSearch = () => {
    setPhpFunction({});
    axios
      .get("php-function", {
        search: value,
      })
      .then((response) => {
        setPhpFunction(response.data);
      });
  };

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Grid
        container
        justify="center"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "30%" }}
        spacing={2}
      >
        <Grid item>
          <FormControl variant="outlined">
            <InputLabel htmlFor="search">函数名</InputLabel>
            <OutlinedInput
              id="search"
              type="text"
              value={value}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickSearch}
                    onMouseDown={handleMouseDownSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {phpFunction && (
          <>
            <Grid item>{phpFunction.category}</Grid>
            <Grid item>{phpFunction.intro}</Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default NoMatch;

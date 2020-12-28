import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert2";

const NoMatch = () => {
  const [value, setValue] = useState("");
  const [phpFunction, setPhpFunction] = useState([]);

  const handleClickSearch = () => {
    searchRequest();
  };

  const handleKeyUP = (e) => {
    if (e.keyCode === 13) {
      searchRequest();
    }
  };

  const searchRequest = () => {
    setPhpFunction([]);
    axios
      .post("php-function", {
        search: value,
      })
      .then((response) => {
        if (response.data.length === 0) {
          swal.fire({
            title: "Not Found！",
            text: "没有找到结果！",
            timer: 2000,
          });
        } else {
          setPhpFunction(response.data);
        }
      });
  };

  const handleMouseDownSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setPhpFunction([]);
  };

  return (
    <Grid>
      <Grid
        container
        justify="center"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "30%" }}
        spacing={2}
      >
        <Grid item>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="search">函数名</InputLabel>
            <OutlinedInput
              id="search"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyUp={handleKeyUP}
              endAdornment={
                <>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="搜索"
                      onClick={handleClear}
                      onMouseDown={handleMouseDownSearch}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="重置搜索"
                      onClick={handleClickSearch}
                      onMouseDown={handleMouseDownSearch}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                </>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      {phpFunction.length > 0 && (
        <Grid
          container
          justify="center"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>分类</TableCell>
                    <TableCell align="right">函数名</TableCell>
                    <TableCell align="right">简介</TableCell>
                    <TableCell align="right">外链</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phpFunction.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.intro}</TableCell>
                      <TableCell align="right">{row.url}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default NoMatch;

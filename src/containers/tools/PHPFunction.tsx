import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import swal from "sweetalert2";

import axios from "../../instance/axios";

const NoMatch = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .get("php-function", {
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
        setLoading(false);
      });
  };

  const handleMouseDownSearch = (event: MouseEvent) => {
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
      <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "20%" }} spacing={2}>
        <Grid item>
          <FormControl variant="outlined" size="small" style={{ width: 350 }}>
            <InputLabel htmlFor="search">函数名</InputLabel>
            <OutlinedInput
              id="search"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyUp={handleKeyUP}
              endAdornment={
                loading ? (
                  <>
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="搜索"
                        onClick={handleClickSearch}
                        onMouseDown={handleMouseDownSearch}
                        edge="end"
                        size="large"
                      >
                        <Icon path={mdiLoading} spin size={1} />
                      </IconButton>
                    </InputAdornment>
                  </>
                ) : (
                  <>
                    {value.length !== 0 && (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="重置搜索"
                          onClick={handleClear}
                          onMouseDown={handleMouseDownSearch}
                          edge="end"
                          size="large"
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="搜索"
                        onClick={handleClickSearch}
                        onMouseDown={handleMouseDownSearch}
                        edge="end"
                        size="large"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
      </Grid>
      {phpFunction.length > 0 && (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>分类</TableCell>
                    <TableCell>函数名</TableCell>
                    <TableCell>简介</TableCell>
                    <TableCell>外链</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phpFunction.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.intro}</TableCell>
                      <TableCell>{row.url}</TableCell>
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

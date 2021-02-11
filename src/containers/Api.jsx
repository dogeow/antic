import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import * as React, { useEffect, useState } from "react";

const Api = () => {
  const [api, setApi] = useState([]);
  const [param, setParam] = useState(null);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const defaultProps = {
    options: api,
    getOptionLabel: (option) => option.endpoint,
  };

  useEffect(() => {
    axios.post("api").then(({ data }) => {
      setApi(data);
    });
  }, []);

  const send = () => {
    axios.get(`${param.endpoint}/${value}`).then(({ data }) => {
      setResult(data);
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography component="h3" variant="h6">
          前缀：
          {process.env.REACT_APP_API_URL}
        </Typography>
      </Grid>

      <Grid item>
        <Autocomplete
          {...defaultProps}
          value={param}
          onChange={(event, newValue) => {
            setParam(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="方法"
              variant="outlined"
              size="small"
              style={{ width: 200 }}
            />
          )}
        />
      </Grid>

      <Grid item>
        <TextField
          label="参数"
          size="small"
          variant="outlined"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          onClick={() => send()}
        >
          Send
        </Button>
      </Grid>

      <Grid item>
        {result && result.length > 100 ? (
          <TextareaAutosize aria-label="textarea" value={result.join("\n")} />
        ) : (
          <Typography component="h4" variant="body1">
            结果：
            {result}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>api</TableCell>
                <TableCell>参数</TableCell>
                <TableCell>介绍</TableCell>
                <TableCell>举例</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {api.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.endpoint}</TableCell>
                  <TableCell>{row.param}</TableCell>
                  <TableCell>{row.content}</TableCell>
                  <TableCell>{row.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Api;

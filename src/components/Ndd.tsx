import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import * as React from "react";

import axios from "../instance/axios.js";

const useStyles = makeStyles((theme) => ({
  "@global": {
    em: {
      color: "#dd4b39",
      fontStyle: "normal",
      fontWeight: "normal",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Ndd = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    q: "",
    result: [],
  });
  const handleSearch = (e) => {
    e.preventDefault();
    window.console.log(values.q);
    axios.get(`search?q=${values.q}`).then((response) => {
      setValues({ ...values, result: response.data });
    });
  };
  const handleChange = (name) => (event) => {
    window.console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <TextField
        id="standard-search"
        label="请输入搜索关键字"
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={handleChange("q")}
      />
      <Button variant="contained" color="primary" type="submit" onClick={handleSearch}>
        搜索
      </Button>
      <div id="result">
        {values.result.data &&
          values.result.data.map((result, index) => (
            <div key={index} className="mb-2">
              <div>
                <a href={result.url}>{result.title}</a>
              </div>
              <div className="text-xs" dangerouslySetInnerHTML={{ __html: result.intro }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ndd;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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

const Search = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    q: "",
    result: [],
  });
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(values.q);
    axios.get(`search?q=${values.q}`).then((response) => {
      setValues({ ...values, result: response.data });
    });
  };
  const handleChange = (name) => (event) => {
    console.log(event.target.value);
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
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSearch}
      >
        搜索
      </Button>
      <div id="result">
        {values.result.data &&
          values.result.data.map((result, index) => (
            <div key={index} className={"mb-2"}>
              <div>
                <a href={result.url}>{result.title}</a>
              </div>
              <div
                className={"text-xs"}
                dangerouslySetInnerHTML={{ __html: result.intro }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;

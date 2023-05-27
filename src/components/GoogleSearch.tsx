import { Button, TextField, Theme } from "@mui/material";
import { GlobalStyles } from "@mui/system";
import * as React from "react";

import axios from "../instance/axios";

const globalStyles = (
  <GlobalStyles
    styles={{
      "#result": {
        color: "#dd4b39",
        fontStyle: "normal",
        fontWeight: "normal",
      },
    }}
  />
);

interface SearchValues {
  q: string;
  result: Array<any>;
}

const Search: React.FC = () => {
  const [values, setValues] = React.useState<SearchValues>({
    q: "",
    result: [],
  });

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.console.log(values.q);
    axios.get(`search?q=${values.q}`).then((response) => {
      setValues({ ...values, result: response.data });
    });
  };

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    window.console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      {globalStyles}

      <div>
        <TextField
          id="standard-search"
          label="请输入搜索关键字"
          type="search"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 200,
          }}
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
    </>
  );
};

export default Search;

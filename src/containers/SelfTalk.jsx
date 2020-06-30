import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  quote: {
    fontFamily: '"Long Cang", cursive',
    fontSize: "2em",
    border: "10px solid transparent",
    padding: 15,
    marginBottom: 5,
    borderImage: "url(/images/border.png) 30 stretch",
    listStyle: "none",
  },
}));

const SelfTalk = () => {
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get("quotes").then((response) => {
      setQuotes(response.data);
    });
  }, []);

  return (
    <div className={classes.quote}>
      {quotes.map((quote, i) => (
        <p key={i}>{quote.content}</p>
      ))}
    </div>
  );
};

export default SelfTalk;

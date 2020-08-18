import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SpeedDial from "../components/SpeedDial";

const useStyles = makeStyles(() => ({
  quote: {
    fontFamily: '"Long Cang", cursive',
    fontSize: (props) => props.fontSize,
    border: "10px solid transparent",
    padding: 15,
    marginBottom: 5,
    borderImage: "url(/images/border.png) 30 stretch",
    listStyle: "none",
  },
}));

const SelfTalk = () => {
  const [fontSize, setFontSize] = useState(2);
  const classes = useStyles({ fontSize: `${fontSize}em` });
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get("quotes").then((response) => {
      setQuotes(response.data);
    });
  }, []);

  const handleSub = () => {
    if (fontSize === 1) {
      return;
    }
    setFontSize(fontSize - 1);
  };

  const handleAdd = () => {
    setFontSize(fontSize + 1);
  };

  const actions = [
    { icon: <AddIcon />, name: "加大", action: handleAdd },
    { icon: <RemoveIcon />, name: "减小", action: handleSub },
  ];

  return (
    <div>
      <div className={classes.quote}>
        {quotes.map((quote, i) => (
          <p key={i}>{quote.content}</p>
        ))}
      </div>
      <SpeedDial
        actions={actions}
        onHandleAdd={handleAdd}
        onHandleSub={handleSub}
      />
    </div>
  );
};

export default SelfTalk;

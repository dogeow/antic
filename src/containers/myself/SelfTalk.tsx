import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles, Theme } from "@mui/styles";
import React, { useEffect, useState } from "react";

import SpeedDial from "../../components/display/SpeedDial";
import { QUOTE_FONT } from "../../config/services";
import { CDN_URL } from "../../config/services";
import { QUOTES } from "../../graphql/lab";

interface Props {
  fontSize: string;
}

const useStyles = makeStyles<Theme, Props>(() => ({
  quote: {
    fontFamily: '"Long Cang", cursive',
    fontSize: (props) => props.fontSize,
    border: "10px solid transparent",
    padding: 15,
    marginBottom: 5,
    borderImage: `url(${CDN_URL}/border/border-image-4.png) 30 stretch`,
    listStyle: "none",
  },
}));

const fontSizeDefault = 2;

const SelfTalk = () => {
  const [fontSize, setFontSize] = useState(fontSizeDefault);
  const classes = useStyles({ fontSize: `${fontSize}rem` });
  const [quotes, setQuotes] = useState([]);

  const { data } = useQuery(QUOTES, { fetchPolicy: "cache-and-network" });

  useEffect(() => {
    data && setQuotes(data.quotes);
  }, [data]);

  const handleSub = () => {
    if (fontSize === 1) {
      return;
    }
    setFontSize(fontSize - 1);
  };

  const handleAdd = () => {
    setFontSize(fontSize + 1);
  };

  const handleRest = () => {
    setFontSize(fontSizeDefault);
  };

  const actions = [
    { icon: <AddIcon />, name: "加大", action: handleAdd },
    { icon: <RefreshIcon />, name: "恢复", action: handleRest },
    { icon: <RemoveIcon />, name: "减小", action: handleSub },
  ];

  const quoteList = quotes.map((quote: Quote) => <p key={quote.id}>{quote.content}</p>);

  return (
    <div>
      <link href={QUOTE_FONT} rel="stylesheet" />
      <div className={classes.quote}>{quoteList}</div>
      <SpeedDial actions={actions} onHandleAdd={handleAdd} onHandleSub={handleSub} />
    </div>
  );
};

export default SelfTalk;

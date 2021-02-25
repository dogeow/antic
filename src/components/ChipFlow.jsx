import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";

import axios from "../instance/axios";

const ChipFlow = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(props.path).then(({ data }) => {
      setItems(data);
    });
  }, [props.path]);

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item key={index}>
          <Chip
            label={item}
            variant="outlined"
            onClick={() => {
              props.onHandleClick(item);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChipFlow;

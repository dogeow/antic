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
      {items.map((item) => (
        <Grid item key={item.id}>
          <Chip
            label={item.id}
            variant="outlined"
            onClick={() => {
              props.onHandleClick(item.name);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChipFlow;

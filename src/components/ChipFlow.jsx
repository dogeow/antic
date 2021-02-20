import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import React, { useEffect } from "react";

import axios from "../helpers/api";

const ChipFlow = (props) => {
  const [items, setItems] = React.useState([]);

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

import { Badge, Chip, Grid } from "@mui/material";
import * as React from "react";

type Item = {
  id?: string;
  name: string;
  count: number;
};

type Props = {
  type: keyof Item;
  currentSelect?: string;
  items?: Item[];
  onHandleClick: (selected: string) => void;
};

const ChipFlow: React.FC<Props> = (props) => {
  return (
    <Grid container spacing={2}>
      {props.items &&
        props.items.map((item) => (
          <Grid item key={item.id || item.name}>
            <Badge badgeContent={item.count}>
              <Chip
                label={item.name}
                variant={props.currentSelect === item[props.type] ? "default" : "outlined"}
                color={props.currentSelect === item[props.type] ? "primary" : "default"}
                onClick={() => {
                  props.onHandleClick(item[props.type]);
                }}
              />
            </Badge>
          </Grid>
        ))}
    </Grid>
  );
};

export default ChipFlow;

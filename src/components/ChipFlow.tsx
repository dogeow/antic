import { Badge, Chip, Grid } from "@mui/material";
import * as React from "react";

type Item = {
  id?: string;
  name: string;
  count: number;
};

type Props = {
  type?: keyof Item;
  currentSelect?: string;
  items?: Item[];
  onChipClick: (selected: string) => void;
};

const ChipFlow: React.FC<Props> = ({ type, currentSelect, items, onChipClick }) => {
  return (
    <Grid container spacing={2}>
      {items?.map((item) => {
        const isSelected = currentSelect === item[type];
        return (
          <Grid item key={item.id || item.name}>
            <Badge badgeContent={item.count}>
              <Chip
                label={item.name}
                variant={isSelected ? "default" : "outlined"}
                color={isSelected ? "primary" : "default"}
                onClick={() => onChipClick(item[type])}
              />
            </Badge>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ChipFlow;

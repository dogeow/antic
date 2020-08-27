import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useStore } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStylePosition: "outside",
    listStyle: "none",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tags = (props) => {
  const classes = useStyles();
  const store = useStore();
  const state = store.getState();

  const handleDelete = (chipToDelete) => () => {};

  return props.tags ? (
    <ul className={classes.root}>
      {props.tags.map((tag) => {
        return (
          <li key={tag}>
            <Chip
              size="small"
              label={tag}
              onDelete={state.lab.user_id ? handleDelete(tag) : undefined}
              className={classes.chip}
            />
          </li>
        );
      })}
    </ul>
  ) : (
    <div />
  );
};

export default Tags;

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";
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

  return props.tags ? (
    <ul className={classes.root}>
      {props.tags.map((tag) => {
        return (
          <li key={tag.name} style={{ alignSelf: "center" }}>
            <Chip
              size="small"
              label={tag.name}
              onDelete={
                state.lab.userId && props.newTagOpen
                  ? () => props.delete(tag.name)
                  : undefined
              }
              className={classes.chip}
            />
          </li>
        );
      })}
      {props.newTagOpen && (
        <>
          <li>
            <TextField label="新标签" variant="outlined" size="small" />
          </li>
          <li>
            <IconButton aria-label="new" onClick={props.new}>
              <AddIcon type="button" />
            </IconButton>
          </li>
        </>
      )}
    </ul>
  ) : (
    <div />
  );
};

export default Tags;

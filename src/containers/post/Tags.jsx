import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  tags: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Tags = ({ lab, tags, tagsDelete, tagsAdd, edit }) => {
  const classes = useStyles();

  const [newTag, setNewTag] = useState("");

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const handleSaveNewTag = () => {
    tagsAdd(newTag);
    setNewTag("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveNewTag();
    }
  };

  return edit ? (
    <TextField
      label="标签"
      variant="outlined"
      value={newTag}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag.name}
                variant="outlined"
                size="small"
                onDelete={
                  lab.userId && edit ? () => tagsDelete(tag.name) : undefined
                }
              />
            ))}
          </InputAdornment>
        ),
      }}
      onChange={handleNewTag}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <div className={classes.tags}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag.name} variant="outlined" size="small" />
      ))}
    </div>
  );
};

export default Tags;

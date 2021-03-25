import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

const Tags = ({ lab, tags, tagsDelete, tagsAdd, edit }) => {
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

  return (
    edit && (
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
    )
  );
};

export default Tags;

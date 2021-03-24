import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import React, { useState } from "react";

const Tags = ({ lab, tags, post, tagsDelete, tagsAdd }) => {
  const [newTag, setNewTag] = useState("");

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const handleSaveNewTag = () => {
    tagsAdd(post, newTag);
    setNewTag("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveNewTag();
    }
  };

  return (
    <Grid item container spacing={1}>
      {tags.map((tag) => (
        <Grid item key={tag}>
          <Chip
            label={tag.name}
            variant="outlined"
            size="small"
            onDelete={lab.userId ? () => tagsDelete(post, tag.name) : undefined}
          />
        </Grid>
      ))}
      <Grid item>
        <Input
          value={newTag}
          onChange={handleNewTag}
          onKeyDown={handleKeyDown}
          fullWidth
          inputProps={{
            "aria-label": "标签",
          }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" size="small" onClick={handleSaveNewTag}>
          添加
        </Button>
      </Grid>
    </Grid>
  );
};

export default Tags;

import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import React, { useState } from "react";
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";

import axios from "../../instance/axios";

const Tags = ({ tags, post, tagsDelete }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const state = store.getState();
  const [newTag, setNewTag] = useState("");

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const handleSaveNewTag = () => {
    console.log(newTag);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveNewTag();
    }
  };

  const handleDeleteTag = (name) => {
    axios.delete(`/posts/${post.id}/tag`, { data: { name } }).then(() => {});
    dispatch(tagsDelete(name));
  };

  return (
    <Grid container spacing={1}>
      {tags.map((tag) => (
        <Grid item key={tag}>
          <Chip
            label={tag.name}
            size="small"
            onDelete={
              state.lab.userId ? () => handleDeleteTag(tag.name) : undefined
            }
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

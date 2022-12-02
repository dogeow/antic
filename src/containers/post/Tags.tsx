import { useQuery } from "@apollo/client";
import { Autocomplete, Theme } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import { TAGS } from "../../graphql/post";
import { removeItemAtIndex } from "../../helpers";
import axios from "../../instance/axios";
import { allTagsState, postState, tagsState, userState } from "../../states";

const useStyles = makeStyles((theme: Theme) => ({
  tags: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const Tags = ({ edit }) => {
  const classes = useStyles();

  const [allTags, setAllTags] = useRecoilState(allTagsState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [post] = useRecoilState<Post>(postState);
  const [user] = useRecoilState(userState);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setAllTags(data.tags);
    }
  }, [data, setAllTags]);

  return edit ? (
    <Autocomplete
      multiple
      id="tags-filled"
      autoHighlight
      options={allTags.map((option) => option.name)}
      freeSolo
      onChange={(event) => {
        setTags((tags) => [...tags, allTags[event.target.dataset.optionIndex]]);
      }}
      value={tags.map((tag) => tag.name)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option}
            variant="outlined"
            size="small"
            key={index}
            {...getTagProps({ index })}
            onDelete={() => {
              setTags(removeItemAtIndex(tags, index));
            }}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="标签" size="small" placeholder="新标签" />
      )}
    />
  ) : (
    <div className={classes.tags}>
      {tags.map((tag, index) => (
        <Chip key={index} label={tag.name} variant="outlined" size="small" />
      ))}
    </div>
  );
};

export default Tags;

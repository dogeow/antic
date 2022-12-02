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
import { allTagsState, postState } from "../../states";

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
  const [post, setPost] = useRecoilState<Post>(postState);

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
      options={allTags.map((option: { name: string }) => option.name)}
      freeSolo
      onChange={(event, newValue) => {
        if (undefined === event.target.dataset.optionIndex) {
          axios.post(`/posts/${post.id}/tag`, { name: event.target.value }).then(({ data }) => {
            setPost({ ...post, tags: [...post.tags, data] });
          });
          const newPost = { ...post, tags: newValue };
          setPost(newPost);
        } else {
          const newTags = allTags[event.target.dataset.optionIndex];
          const newPost = { ...post, tags: [...post.tags, newTags] };
          setPost(newPost);
        }
      }}
      value={post.tags.map((tag) => tag.name)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option}
            variant="outlined"
            size="small"
            key={index}
            {...getTagProps({ index })}
            onDelete={() => {
              setPost({ ...post, tags: removeItemAtIndex(post.tags, index) });
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
      {post.tags &&
        post.tags.map((tag, index) => <Chip key={index} label={tag.name} variant="outlined" size="small" />)}
    </div>
  );
};

export default Tags;

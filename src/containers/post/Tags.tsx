import { gql, useQuery } from "@apollo/client";
import { Autocomplete, Theme } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const useStyles = makeStyles((theme: Theme) => ({
  tags: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const TAGS = gql`
  query {
    tags {
      id
      name
    }
  }
`;

import axios from "../../instance/axios";
import { allTagsState, postState, tagsState, userState } from "../../states";

const Tags = ({ edit }) => {
  const classes = useStyles();

  const [allTags, setAllTags] = useRecoilState(allTagsState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [post, setPost] = useRecoilState(postState);
  const [user, setUser] = useRecoilState(userState);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setAllTags(data.tags);
    }
  }, [data]);

  return edit ? (
    <Autocomplete
      multiple
      id="tags-filled"
      autoHighlight
      options={allTags.map((option) => option.name)}
      freeSolo
      value={tags.map((tag) => tag.name)}
      onChange={(event, newValue) => {
        axios.post(`/posts/${post.id}/tag`, { name: event.target.value }).then(({ data }) => {
          setTags((tags) => [...tags, data]);
        });
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            size="small"
            label={option}
            {...getTagProps({ index })}
            onDelete={
              user.id && edit
                ? (option) => {
                    axios
                      .delete(`/posts/${post.id}/tag`, {
                        data: { name: option },
                      })
                      .then(({ data: count }) => {
                        if (count === 1) {
                          // todo
                        }
                      });
                  }
                : undefined
            }
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

import { gql, useQuery } from "@apollo/client";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
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

const Tags = ({ lab, tags, tagsDelete, tagsAdd, edit }) => {
  const classes = useStyles();

  const [allTags, setAllTags] = useState([]);

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
      options={allTags.map((option) => option.name)}
      freeSolo
      value={tags.map((tag) => tag.name)}
      onChange={(event, newValue) => {
        tagsAdd(event.target.value);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            size="small"
            label={option}
            {...getTagProps({ index })}
            onDelete={lab.userId && edit ? () => tagsDelete(option) : undefined}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="标签"
          size="small"
          placeholder="新标签"
        />
      )}
    />
  ) : (
    <div className={classes.tags}>
      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.name} variant="outlined" size="small" />
      ))}
    </div>
  );
};

export default Tags;

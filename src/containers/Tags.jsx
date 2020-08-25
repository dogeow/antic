import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React from "react";

const Categories = () => {
  const [tags, setTags] = React.useState([]);

  const handleClick = () => {};

  React.useEffect(() => {
    axios.get("tags").then(({ data }) => {
      setTags(data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {tags.map((tags, index) => (
        <Grid item key={index}>
          <Chip label={tags} variant="outlined" onClick={handleClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;

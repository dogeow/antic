import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React from "react";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  const handleClick = () => {};

  React.useEffect(() => {
    axios.get("categories").then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      {categories.map((category, index) => (
        <Grid item key={index}>
          <Chip label={category} variant="outlined" onClick={handleClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;

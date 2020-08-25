import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React from "react";

const Categories = (props) => {
  const [items, setItems] = React.useState([]);

  const handleClick = () => {};

  React.useEffect(() => {
    axios.get(props.path).then(({ data }) => {
      setItems(data);
    });
  }, [props.path]);

  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item key={index}>
          <Chip label={item} variant="outlined" onClick={handleClick} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;

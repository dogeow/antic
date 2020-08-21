import React from "react";
import Chip from "@material-ui/core/Chip";

const Tags = (props) =>
  props.tags.map((tag) => (
    <Chip label={tag} variant="outlined" size="small" key={tag} />
  ));

export default Tags;

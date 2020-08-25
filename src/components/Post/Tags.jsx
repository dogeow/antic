import Chip from "@material-ui/core/Chip";
import React from "react";

const Tags = (props) =>
  props.tags ? (
    props.tags.map((tag) => (
      <Chip label={tag} variant="outlined" size="small" key={tag} />
    ))
  ) : (
    <div />
  );

export default Tags;

import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";

const AllTags = (props) => {
  const [tag, setTag] = useState(undefined);

  return props.tags.length ? (
    <ChipFlow
      items={props.tags}
      type="name"
      currentSelect={tag}
      onHandleClick={(tag) => {
        setTag(tag);
        props.changeTag(tag);
      }}
    />
  ) : (
    <Skeleton variant="rectangular" height="24rem" />
  );
};

export default AllTags;

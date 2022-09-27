import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";

const AllTags = (props) => {
  const [currTag, setCurrTag] = useState(undefined);

  return props.tags.length ? (
    <ChipFlow
      items={props.tags}
      type="name"
      currentSelect={currTag}
      onHandleClick={(tag) => {
        if (currTag === tag) {
          setCurrTag(undefined);
          props.changeTag(undefined);
        } else {
          setCurrTag(tag);
          props.changeTag(tag);
        }
      }}
    />
  ) : (
    <Skeleton variant="rectangular" height="24rem" />
  );
};

export default AllTags;

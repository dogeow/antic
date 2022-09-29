import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";

const AllTags = (props: { tags: Tag[]; changeTag: { (arg: string): void } }) => {
  const [currTag, setCurrTag] = useState<string>("");

  return props.tags.length ? (
    <ChipFlow
      items={props.tags}
      type="name"
      currentSelect={currTag}
      onHandleClick={(tag: string) => {
        if (currTag === tag) {
          setCurrTag("");
          props.changeTag("");
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

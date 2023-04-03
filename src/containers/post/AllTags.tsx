import { Grid, Skeleton } from "@mui/material";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";
import { generateRandomInt } from "../../helpers/math";

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
    <Grid item container spacing={1}>
      {Array.from(new Array(20)).map((item, index) => (
        <Grid item xs={"auto"} key={index}>
          <Skeleton variant="rounded" width={`${generateRandomInt(3, 5)}rem`} height="2rem" />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllTags;

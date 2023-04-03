import { Grid, Skeleton } from "@mui/material";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";
import { generateRandomInt } from "../../helpers/math";

export default (props: { categories: Category[]; changeCategory: { (arg: number | null): void } }) => {
  const [currCategory, setCurrCategory] = useState<string>("");

  return props.categories.length ? (
    <ChipFlow
      items={props.categories}
      type="id"
      currentSelect={currCategory}
      onHandleClick={(category: string) => {
        if (currCategory === category) {
          setCurrCategory("");
          props.changeCategory(null);
        } else {
          setCurrCategory(category);
          props.changeCategory(parseInt(category));
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

import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";

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
    <Skeleton variant="rectangular" height="24rem" />
  );
};

import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import { useState } from "react";

import ChipFlow from "../../components/ChipFlow";

export default (props) => {
  const [currCategory, setCurrCategory] = useState(undefined);

  return props.categories.length ? (
    <ChipFlow
      items={props.categories}
      type="id"
      currentSelect={currCategory}
      onHandleClick={(category) => {
        if (currCategory === category) {
          setCurrCategory(undefined);
          props.changeCategory(undefined);
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

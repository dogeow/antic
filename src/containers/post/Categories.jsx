import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";

import ChipFlow from "../../components/ChipFlow";
import { CATEGORIES } from "../../graphql/post";

export default (props) => {
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState(undefined);

  const { data } = useQuery(CATEGORIES);

  useEffect(() => {
    if (data) {
      setCategories(_.orderBy(data.categories, ["count"], ["desc"]));
    }
  }, [data]);

  return categories.length ? (
    <ChipFlow
      items={categories}
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

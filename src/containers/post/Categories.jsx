import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";

const CATEGORIES = gql`
  query {
    categories {
      id
      name
      count
    }
  }
`;

import ChipFlow from "../../components/ChipFlow";

const Categories = (props) => {
  const [items, setItems] = useState([]);

  const { data } = useQuery(CATEGORIES);

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.categories, ["count"], ["desc"]));
    }
  }, [data]);

  return (
    <ChipFlow
      items={items}
      onHandleClick={(category) => props.changeCategory(category)}
    />
  );
};

export default Categories;

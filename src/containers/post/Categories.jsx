import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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

const Categories = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);

  const { data } = useQuery(CATEGORIES);

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.categories, ["count"], ["desc"]));
    }
  }, [data]);

  const handleClick = (category) => {
    history.push(`/posts?filter[category.name]=${category}`);
  };

  return <ChipFlow items={items} onHandleClick={handleClick} />;
};

export default Categories;

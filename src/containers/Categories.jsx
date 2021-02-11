import * as React from "react";
import { useHistory } from "react-router-dom";

import ChipFlow from "../components/ChipFlow";

const Categories = () => {
  const history = useHistory();

  const handleClick = (category) => {
    history.push(`/posts?filter[category.name]=${category}`);
  };

  return <ChipFlow path="categories" onHandleClick={handleClick} />;
};

export default Categories;

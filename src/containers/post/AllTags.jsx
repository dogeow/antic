import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ChipFlow from "../../components/ChipFlow";
import axios from "../../instance/axios";

const Categories = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("/posts/tags/count").then(({ data }) => {
      setItems(data);
    });
  }, []);

  const handleClick = (category) => {
    history.push(`/posts?filter[tags.name]=${category}`);
  };

  return <ChipFlow items={items} onHandleClick={handleClick} />;
};

export default Categories;

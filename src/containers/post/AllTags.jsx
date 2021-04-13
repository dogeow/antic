import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ChipFlow from "../../components/ChipFlow";

const TAGS = gql`
  query {
    TagsCount {
      id
      name
      count
    }
  }
`;

const AllTags = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setItems(data.TagsCount);
    }
  }, [data]);

  const handleClick = (category) => {
    history.push(`/posts?filter[tags.name]=${category}`);
  };

  return <ChipFlow items={items} onHandleClick={handleClick} />;
};

export default AllTags;

import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";

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

const AllTags = (props) => {
  const [items, setItems] = useState([]);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.TagsCount, ["count"], ["desc"]));
    }
  }, [data]);

  return (
    <ChipFlow items={items} onHandleClick={(tag) => props.changeTag(tag)} />
  );
};

export default AllTags;

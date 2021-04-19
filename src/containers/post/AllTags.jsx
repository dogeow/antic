import { useQuery } from "@apollo/client";
import * as React from "react";
import { useEffect, useState } from "react";

import ChipFlow from "../../components/ChipFlow";
import { TAGS } from "../../graphql/post";

const AllTags = (props) => {
  const [items, setItems] = useState([]);
  const [tag, setTag] = useState(undefined);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.TagsCount, ["count"], ["desc"]));
    }
  }, [data]);

  return (
    <ChipFlow
      items={items}
      currentSelect={tag}
      onHandleClick={(tag) => {
        setTag(tag);
        props.changeTag(tag);
      }}
    />
  );
};

export default AllTags;

import { useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import ChipFlow from "components/ChipFlow";
import { TAGS } from "graphql/post";
import * as React from "react";
import { useEffect, useState } from "react";

const AllTags = (props) => {
  const [items, setItems] = useState([]);
  const [tag, setTag] = useState(undefined);

  const { data } = useQuery(TAGS);

  useEffect(() => {
    if (data) {
      setItems(_.orderBy(data.TagsCount, ["count"], ["desc"]));
    }
  }, [data]);

  return items.length ? (
    <ChipFlow
      items={items}
      type="name"
      currentSelect={tag}
      onHandleClick={(tag) => {
        setTag(tag);
        props.changeTag(tag);
      }}
    />
  ) : (
    <Skeleton variant="rectangular" height="24rem" />
  );
};

export default AllTags;

import { useQuery } from "@apollo/client";
import Skeleton from "@material-ui/lab/Skeleton";
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
    <Skeleton variant="rect" height="24rem" />
  );
};

export default AllTags;

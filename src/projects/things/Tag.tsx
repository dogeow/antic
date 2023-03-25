import makeStyles from "@mui/styles/makeStyles";
import { Badge, Tag } from "antd-mobile";
import React, { useEffect, useState } from "react";

import axios from "../..//instance/axios";
import Bottom from "./Bottom";

const useStyles = makeStyles(() => ({
  tags: {
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  tag: {
    margin: 10,
    fontSize: "medium",
    padding: "6px 12px",
  },
}));

interface Tag {
  name: string;
  count: number;
}

function TagList() {
  const classes = useStyles();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    axios.get("/tags").then(({ data }) => {
      setTags(data);
    });
  }, []);

  return (
    <div>
      <div className={classes.tags}>
        {tags.map((tag, index) => (
          <Badge content={tag.count} style={{ margin: 10 }} key={index}>
            <Tag round color="#2db7f5" className={classes.tag}>
              {tag.name}
            </Tag>
          </Badge>
        ))}
      </div>
      <Bottom />
    </div>
  );
}

export default TagList;

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import * as React from "react";

import face from "../../resources/face.json";

const TagsElem = (props) => {
  // 获取各标签的图片数量
  const total = {};
  face.map((single) => {
    for (const singleTag of single.tag) {
      total[singleTag] = ++total[singleTag] || 1;
    }
    return total;
  });

  const tagsElem = [];

  for (const tag of props.displayTag) {
    tagsElem.push(
      <div key={tag} style={{ display: "inline-block", position: "relative" }}>
        <Badge badgeContent={total[tag]}>
          <Button
            variant={
              props.lab.paletteMode === "dark" ? "outlined" : "contained"
            }
            color={
              props.selectedTag.indexOf(tag) !== -1 ? "secondary" : "primary"
            }
            key={tag}
            onClick={() => props.selectTag(tag)}
          >
            {tag}
          </Button>
        </Badge>
      </div>
    );
  }

  return tagsElem;
};

export default TagsElem;

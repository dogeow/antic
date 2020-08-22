import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import React from "react";

import face from "../../resources/face.json";

const TagsElem = (props) => {
  // 获取各标签的图片数量
  const total = {};
  face.map(function (single) {
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
              props.lab.themePaletteType === "dark" ? "outlined" : "contained"
            }
            color={
              props.selectedTag.indexOf(tag) !== -1 ? "secondary" : "default"
            }
            key={tag}
            onClick={() => props.select_tag(tag)}
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

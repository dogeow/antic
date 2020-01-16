import React from 'react'
import Button from '@material-ui/core/Button'
import face from '../../resources/face.json'
import Badge from '@material-ui/core/Badge'

const TagsElem = (props) => {
  // 获取各标签的图片数量
  let total = {};
  face.map(function (single) {
    for (const singleTag of single["tag"]) {
      total[singleTag] = ++total[singleTag] || 1;
    }
    return total;
  });

  let tagsElem = [];

  for (const tag of props.displayTag) {
    tagsElem.push(
      <div key={tag} style={{display: "inline-block", position: "relative"}}>
        <Badge badgeContent={total[tag]}>
          <Button
            variant="contained"
            color={props.selectedTag.indexOf(tag) !== -1 ? "primary" : "default"}
            key={tag}
            onClick={() => props.select_tag(tag)}
          >
            {tag}
          </Button>
        </Badge>
      </div>
    )
  }

  return tagsElem;
};

export default TagsElem;

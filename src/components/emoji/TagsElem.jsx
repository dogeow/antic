import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import * as React from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState } from "recoil";

import face from "../../resources/face.json";
import { paletteModeState } from "../../states";
import { displayTagState, expandTagState, selectedTagState } from "../../states/emoji";

const TagsElem = () => {
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const [displayTag, setDisplayTag] = useRecoilState(displayTagState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [expandTag, setExpandTag] = useRecoilState(expandTagState);

  // 获取各标签的图片数量
  const total = {};
  face.map((single) => {
    for (const singleTag of single.tag) {
      total[singleTag] = ++total[singleTag] || 1;
    }
    return total;
  });

  const tagsElem = [];

  for (const tag of displayTag) {
    tagsElem.push(
      <div key={tag} style={{ display: "inline-block", position: "relative" }}>
        <Badge badgeContent={total[tag]}>
          <Button
            variant={paletteMode === "dark" ? "outlined" : "contained"}
            color={selectedTag.indexOf(tag) !== -1 ? "secondary" : "primary"}
            key={tag}
            onClick={() => {
              setExpandTag(!isMobile);
              setSelectedTag(tag);
            }}
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

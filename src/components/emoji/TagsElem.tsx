import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import * as React from "react";
import { isMobile } from "react-device-detect";
import { useRecoilState } from "recoil";

import face from "../../resources/face.json";
import { displayTagState, expandTagState, paletteModeState, selectedTagState } from "../../states";

const TagsElem = () => {
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const [displayTag] = useRecoilState(displayTagState);
  const [paletteMode] = useRecoilState(paletteModeState);
  const [, setExpandTag] = useRecoilState(expandTagState);

  // 获取各标签的图片数量
  const total: {
    [propName: string]: number;
  } = {};
  face.map((single) => {
    for (const singleTag of single.tag) {
      total[singleTag] = ++total[singleTag] || 1;
    }
    return total;
  });

  return (
    <div>
      {displayTag.map((tag, index) => (
        <div key={index} style={{ display: "inline-block", position: "relative" }}>
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
      ))}
    </div>
  );
};

export default TagsElem;

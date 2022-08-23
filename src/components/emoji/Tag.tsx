import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import { expandTagState, paletteModeState, selectedTagState } from "../../states";
import TagsElem from "./TagsElem";

const Tag = () => {
  const [selectedTag, setSelectedTag] = useRecoilState(selectedTagState);
  const [paletteMode] = useRecoilState(paletteModeState);
  const [expandTag, setExpandTag] = useRecoilState(expandTagState);
  const color = selectedTag === "全部" ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => setExpandTag(!expandTag)}>
          {expandTag ? "标签 <<" : "标签 >>"}
        </Button>
      </Grid>
      {"："}
      <Grid item>
        {expandTag ? (
          <Button
            variant={paletteMode === "dark" ? "outlined" : "contained"}
            color={color}
            onClick={() => setSelectedTag("全部")}
          >
            全部
          </Button>
        ) : (
          selectedTag
        )}
      </Grid>
      {expandTag && <TagsElem />}
    </Grid>
  );
};

export default Tag;

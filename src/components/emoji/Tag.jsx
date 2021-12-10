import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";

import TagsElem from "./TagsElem";

const Tag = (props) => {
  const color = props.selectedTag === "全部" ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => props.toggleTag()}>
          {props.expandTag ? "标签 <<" : "标签 >>"}
        </Button>
      </Grid>
      <Grid item>
        ：
        {props.expandTag ? (
          <Button
            variant={
              props.lab.paletteMode === "dark" ? "outlined" : "contained"
            }
            color={color}
            onClick={() => props.selectTag("全部")}
          >
            全部
          </Button>
        ) : (
          props.selectedTag
        )}
      </Grid>
      {props.expandTag && <TagsElem {...props} />}
    </Grid>
  );
};

export default Tag;

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import { paletteModeState } from "../../states";
import { expandCategoryState, selectedCategoryState } from "../../states/emoji";
import CategoriesElem from "./CategoriesElem";

const Category = (props) => {
  const [expandCategory, setExpandCategory] = useRecoilState(expandCategoryState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const color = selectedCategory === "全部" ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => setExpandCategory(!expandCategory)}>
          {expandCategory ? "分类 <<" : "分类 >>"}
        </Button>
      </Grid>
      {"："}
      <Grid item>
        {expandCategory ? (
          <Button
            variant={paletteMode === "dark" ? "outlined" : "contained"}
            color={color}
            onClick={() => setSelectedCategory("全部")}
          >
            全部
          </Button>
        ) : (
          selectedCategory
        )}
      </Grid>
      {expandCategory && <CategoriesElem />}
    </Grid>
  );
};

export default Category;

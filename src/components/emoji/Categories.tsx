import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import { isCategoryExpandedState, paletteModeState, selectedCategoryState } from "../../states";
import CategoriesElem from "./CategoriesElem";

const ALL_CATEGORY = "全部";

const Category = () => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useRecoilState(isCategoryExpandedState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [paletteMode] = useRecoilState(paletteModeState);
  const color = selectedCategory === ALL_CATEGORY ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}>
          {isCategoryExpanded ? "分类 <<" : "分类 >>"}
        </Button>
      </Grid>
      {"："}
      <Grid item>
        {isCategoryExpanded ? (
          <Button
            variant={paletteMode === "dark" ? "outlined" : "contained"}
            color={color}
            onClick={() => setSelectedCategory(ALL_CATEGORY)}
          >
            {ALL_CATEGORY}
          </Button>
        ) : (
          selectedCategory
        )}
      </Grid>
      {isCategoryExpanded && <CategoriesElem />}
    </Grid>
  );
};

export default Category;

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import face from "../../resources/face.json";
import { selectedCategoryState } from "../../states/emoji.js";
import { paletteModeState } from "../../states/index.js";

const CategoriesElem = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  let categories = [];
  const total = {}; // 统计各个分类的图片张数
  face.map(function (single) {
    total[single.category] = ++total[single.category] || 1;

    return (categories = categories.concat(single.category));
  });
  const uniqCategories = new Set(categories);

  const categoriesElem = [];
  for (const category of uniqCategories) {
    categoriesElem.push(
      <Grid item key={category} style={{ display: "inline-block", position: "relative" }}>
        <Badge badgeContent={total[category]}>
          <Button
            variant={paletteMode === "dark" ? "outlined" : "contained"}
            color={selectedCategory.indexOf(category) !== -1 ? "secondary" : "primary"}
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        </Badge>
      </Grid>
    );
  }

  return categoriesElem;
};

export default CategoriesElem;

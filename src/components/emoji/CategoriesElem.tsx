import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import _ from "lodash";
import * as React from "react";
import { useRecoilState } from "recoil";

import face from "../../resources/face.json";
import { paletteModeState } from "../../states";
import { selectedCategoryState } from "../../states";

const CategoriesElem = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);
  const [paletteMode] = useRecoilState(paletteModeState);

  let categories: string[] = [];
  // 统计各个分类的图片张数
  const total: {
    [propName: string]: number;
  } = {};
  face.map(function (single) {
    total[single.category] = ++total[single.category] || 1;

    return (categories = categories.concat(single.category));
  });
  const uniqCategories = _.uniq(categories);

  return (
    <div>
      {uniqCategories.map((category, index) => (
        <Grid item key={index} style={{ display: "inline-block", position: "relative" }}>
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
      ))}
    </div>
  );
};

export default CategoriesElem;

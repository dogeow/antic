import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";

import face from "../../resources/face.json";

const CategoriesElem = (props) => {
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
      <Grid
        item
        key={category}
        style={{ display: "inline-block", position: "relative" }}
      >
        <Badge badgeContent={total[category]}>
          <Button
            variant={
              props.lab.paletteMode === "dark" ? "outlined" : "contained"
            }
            color={
              props.selectedCategory.indexOf(category) !== -1
                ? "secondary"
                : "primary"
            }
            key={category}
            onClick={() => props.selectCategory(category)}
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

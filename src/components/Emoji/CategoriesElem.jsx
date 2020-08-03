import React from "react";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
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
              props.lab.themePaletteType === "dark" ? "outlined" : "contained"
            }
            color={
              props.selectedCategory.indexOf(category) !== -1
                ? "secondary"
                : "default"
            }
            key={category}
            onClick={() => props.select_category(category)}
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

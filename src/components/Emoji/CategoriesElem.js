import React from 'react'
import face from '../../resources/face.json'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'

const CategoriesElem = (props) => {
  let categories = [];
  let total = {}; // 统计各个分类的图片张数
  face.map(function (single) {
    total[single["category"]] = ++total[single["category"]] || 1;

    return categories = categories.concat(single["category"]);
  });
  let uniqCategories = new Set(categories);

  let categoriesElem = [];
  for (const category of uniqCategories) {
    categoriesElem.push(
      <Grid item key={category} style={{display: "inline-block", position: "relative"}}>
        <Badge badgeContent={total[category]}>
          <Button
            variant="contained"
            color={props.selectedCategory.indexOf(category) !== -1 ? "primary" : "default"}
            key={category}
            onClick={() => props.select_category(category)}
          >
            {category}
          </Button>
        </Badge>
      </Grid>
    )
  }

  return categoriesElem;
};

export default CategoriesElem;

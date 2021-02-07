import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";

import CategoriesElem from "./CategoriesElem";

const Category = (props) => {
  const color = props.selectedCategory === "全部" ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => props.toggleCategory()}>
          {props.expandCategory ? "分类 <<" : "分类 >>"}
        </Button>
      </Grid>
      ：
      <Grid item>
        {props.expandCategory ? (
          <Button
            variant={
              props.lab.paletteMode === "dark" ? "outlined" : "contained"
            }
            color={color}
            onClick={() => props.selectCategory("全部")}
          >
            全部
          </Button>
        ) : (
          props.selectedCategory
        )}
      </Grid>
      {props.expandCategory && <CategoriesElem {...props} />}
    </Grid>
  );
};

export default Category;

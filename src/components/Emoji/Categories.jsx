import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";

import CategoriesElem from "./CategoriesElem";

const Category = (props) => {
  const color = props.selectedCategory === "全部" ? "secondary" : "default";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.toggleCategory()}
        >
          {props.expandCategory ? "分类 <<" : "分类 >>"}
        </Button>
      </Grid>
      ：
      <Grid item>
        {props.expandCategory ? (
          <Button
            variant={
              props.lab.themePaletteType === "dark" ? "outlined" : "contained"
            }
            color={color}
            onClick={() => props.select_category("全部")}
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

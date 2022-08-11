import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useRecoilState } from "recoil";

import { expandCategoryState } from "../../states/emoji";
import CategoriesElem from "./CategoriesElem";

const Category = (props) => {
  const [expandCategory, setExpandCategory] =
    useRecoilState(expandCategoryState);
  const color = props.selectedCategory === "全部" ? "secondary" : "primary";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button variant="contained" onClick={() => props.toggleCategory()}>
          {expandCategory ? "分类 <<" : "分类 >>"}
        </Button>
      </Grid>
      ：
      <Grid item>
        {expandCategory ? (
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
      {expandCategory && <CategoriesElem {...props} />}
    </Grid>
  );
};

export default Category;

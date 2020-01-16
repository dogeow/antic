import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TagsElem from './TagsElem'

const Tag = (props) => {
  let color = props.selectedTag === "全部" ? "primary" : "default";

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Button
          variant="contained" color={"primary"}
          onClick={() => props.toggleTag()}
        >
          {props.expandTag ? "标签 <<" : "标签 >>"}
        </Button>
      </Grid>
      <Grid item>
      ：
        {
          props.expandTag
            ?
            <Button
              variant="contained" color={color}
              onClick={() => props.select_tag("全部")}
            >
              全部
            </Button>
            :
            props.selectedTag
        }
      </Grid>
      {props.expandTag && <TagsElem {...props}/>}
    </Grid>
  )
};

export default Tag;

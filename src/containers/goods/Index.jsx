import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

import ImgList from "../../components/ImgList";
import Upload from "../../components/Upload";

const EmojiCreate = () => {
  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      <Upload path="/emoji" />
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> 更多照片？</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ImgList />
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid container justify="space-between">
        <Grid item>分类</Grid>
        <Grid item>分类</Grid>
      </Grid>
      <Grid item xs={12}>
        标题
      </Grid>
      <Grid item xs={12}>
        <h3>草稿</h3>
        <ul>
          <li>
            随着生活水平提高，闲置东西越来越多，有时候我们可以用不玩的 Switch 换
            GoPro，或者互相借用。但是，这个系统不是全部公开的，默认是仅限于自己和自己的朋友或亲戚之间。因为，咸鱼那些交易比较麻烦，东西不值钱的，也没必要浪费时间去弄，比如
            VGA 线自己不再使用了，但是可以放着，朋友需要就可以拿去。
          </li>
          <li>
            一：管理自己的物品。二：可以设置为免费或者物物交换、可互相借用
          </li>
          <li>一般都是手机操作，界面和操作要友好</li>
          <li>一键查看自己需要的东西</li>
          <li>属性可以自己添加</li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default EmojiCreate;

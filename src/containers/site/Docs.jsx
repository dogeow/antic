import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles({
  "@global": {
    "#docs ul": {
      listStyleType: "initial",
    },
  },
});

const Docs = () => {
  useStyles();

  return (
    <Grid container id="docs">
      <Grid item xs={12}>
        <h2>实现了</h2>
        <ul>
          <li>登录、注册</li>
          <ul>
            <li>邮箱、手机或 GitHub 注册</li>
            <li>找回密码</li>
            <li>测试用户免密码登录</li>
          </ul>
          <li>黑暗模式</li>
          <li>聊天室</li>
          <ul>
            <li>简单机器人</li>
            <ul>
              <li>发送图片、联动表情包（✖️）</li>
              <li>桌面通知（✖️）</li>
            </ul>
          </ul>
          <ul>
            <li>博客</li>
            <ul>
              <li>文章 Markdown CURD</li>
              <li>分类、标签、文章目录</li>
              <li>评论（✖️）</li>
              <li>按日期归档（✖️）</li>
              <li>标注（✖️）</li>
              <li>翻译（✖️）</li>
              <li>对比（✖️）</li>
              <li>改进（✖️）</li>
              <li>心情（✖️）</li>
              <li>关注（✖️）</li>
              <li>收藏（✖️）</li>
              <li>文档（✖️）</li>
              <li>个人签名（✖️）</li>
              <li>最后活跃（✖️）</li>
              <li>点赞（✖️）</li>
              <li>举报（✖️）</li>
            </ul>
          </ul>
          <li>图片上传</li>
          <ul>
            <li>OSS 图片管理（✖️）</li>
          </ul>
          <li>GraphQL</li>
          <li>仿苹果待办事项</li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <h2>组件</h2>
        <ul>
          <li>Hr</li>
          <li>ExternalLink 参数 href</li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default Docs;

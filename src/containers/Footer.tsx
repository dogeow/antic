import GitHub from "@mui/icons-material/GitHub";
import { Container, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import HomeFooter from "../components/HomeFooter";
import Hr from "../components/Hr";
import { backgroundImg } from "../config/index.json";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundImage:
      theme.palette.mode === "dark"
        ? `url(${import.meta.env.VITE_CDN_URL}/bg/tesla-vector-roadster.png!/compress/true/fw/400)`
        : `url(${import.meta.env.VITE_CDN_URL}/bg/${
            backgroundImg[Math.floor(Math.random() * backgroundImg.length)]
          }!/compress/true/fw/400)`,
    backgroundPosition: "right 20px bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: 200,
    minHeight: 200,
    paddingTop: 16,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container component={Container} maxWidth="lg">
      <Hr />
      <Grid item container className={clsx(classes.footer, classes.ul)}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h5" component="h3">
            说明
          </Typography>
          <ul>
            <li>该实验室的各项功能都是测试版本</li>
            <li>拥抱新技术、新生态，做一个现代化的程序员</li>
            <li>因实验室只有自己在访问和使用，所以没有其他人的注册和信息</li>
            <li>If there is any copyright infringement, please notify us at once and we&apos;ll delete it.</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            长期计划
          </Typography>
          <ul>
            <li>健康</li>
            <li>英语</li>
            <li>PHP + JavaScript</li>
            <li>实时的应用、游戏</li>
            <li>TDD、算法和底层等</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            网站
          </Typography>
          <ul>
            <li>
              <RouteLink to="/project/1">代办事项</RouteLink>
            </li>
            <li>
              <RouteLink to="/docs">网站文档</RouteLink>
            </li>
            <li>
              <RouteLink to="/powered_by">Powered by</RouteLink>
            </li>
            <Tooltip title="GitHub 存储库" aria-label="GitHub 存储库">
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/dogeow/antic"
                target="_blank"
                size="large"
              >
                <GitHub fontSize="small" />
              </IconButton>
            </Tooltip>
          </ul>
        </Grid>
      </Grid>
      <HomeFooter />
    </Grid>
  );
};

export default Footer;

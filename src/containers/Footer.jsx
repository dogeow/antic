import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import GitHub from "@material-ui/icons/GitHub";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import HomeFooter from "../components/HomeFooter";
import backgroundImg from "../config/footerBackground";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: { listStyleType: "none", textAlign: "initial", paddingInlineStart: 20 },
  },
  footer: {
    backgroundImage:
      theme.palette.type === "dark"
        ? `url(${process.env.REACT_APP_CDN_URL}/bg/tesla-vector-roadster.png!/compress/true/fw/400)`
        : `url(${process.env.REACT_APP_CDN_URL}/bg/${
            backgroundImg[Math.floor(Math.random() * backgroundImg.length)]
          }!/compress/true/fw/400)`,
    backgroundPosition: "right 20px bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: 200,
    minHeight: 200,
    paddingTop: 16,
    borderTop:
      theme.palette.type === "dark"
        ? "1px dashed rgba(211,224,233,.15)"
        : "1px dashed rgba(211,224,233,1)",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      component={Container}
      maxWidth="lg"
      style={{ lineHeight: 1.6 }}
    >
      <Grid item container className={classes.footer}>
        <Grid item xs={12} sm={5}>
          <Typography variant="h5" component="h3">
            说明
          </Typography>
          <ul>
            <li>该实验室的各项功能都是测试版本</li>
            <li>因实验室只有自己在访问和使用，所以没有其他人的注册和信息</li>
            <li>拥抱新技术、新生态，做一个现代化的程序员</li>
            <li>
              If there is any copyright infringement, please notify us at once
              and we&apos;ll delete it.
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            长期计划
          </Typography>
          <ul>
            <li>健康</li>
            <li>PHP + JavaScript</li>
            <li>TDD、算法和底层等</li>
            <li>英语</li>
            <li>实时的应用、游戏</li>
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
              <RouteLink to="/powered_by">Powered by</RouteLink>
            </li>
            <Tooltip title="GitHub 存储库" aria-label="GitHub 存储库">
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/likunyan/antic"
                target="_blank"
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

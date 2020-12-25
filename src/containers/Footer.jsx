import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

const background = [
  "camry_1.png",
  "camry_2.png",
  "tesla-model-3-png-1-original.png",
  "Supra_1.png",
  "Supra_2.png",
  "Supra_2.png",
  "Mustang.png",
];

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundImage:
      theme.palette.type === "dark"
        ? `url(${process.env.REACT_APP_CDN_URL}/bg/tesla-vector-roadster.png!/compress/true/fw/400)`
        : `url(${process.env.REACT_APP_CDN_URL}/bg/${
            background[Math.floor(Math.random() * background.length)]
          }!/compress/true/fw/400)`,
    backgroundPosition: "right top",
    backgroundRepeat: "no-repeat",
    backgroundSize: 200,
    minHeight: 200,
    paddingTop: "2rem",
    marginTop: "2rem",
    borderTop: "1px solid rgba(211,224,233,.15)",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Container component="footer" className={classes.footer}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Typography variant="h5" component="h3">
            Powered by
          </Typography>
          <ul>
            <li>
              <a
                href="https://zh-hans.reactjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
            </li>
            <li>
              <a
                href="https://material-ui.com/zh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Material-UI
              </a>
            </li>
            <li>
              <a
                href=" https://laravel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Laravel
              </a>
            </li>
            <li>
              <RouteLink to="/powered-by">More?</RouteLink>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant="h5" component="h3">
            长期计划
          </Typography>
          <ul>
            <li>WebSocket 实时应用</li>
            <li>Canvas / Three.js + WebSocket 像素游戏</li>
            <li>Next.js</li>
            <li>EasyWechat + Taro</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm>
          <Typography variant="h5" component="h3">
            常用网址
          </Typography>
          <ul>
            <li>
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                谷歌搜素
              </a>
            </li>
            <li>
              <a
                href="https://translate.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                谷歌翻译
              </a>
            </li>
          </ul>
        </Grid>
      </Grid>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        Built By <a href="https://kunyan.li">小李世界</a> with{" "}
        <span role="img" aria-label="❤">
          ❤️
        </span>
      </div>
    </Container>
  );
};

export default Footer;

import GitHub from "@mui/icons-material/GitHub";
import { Container, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";

import Hr from "../components/display/Hr";
import HomeFooter from "../components/footer";
import { backgroundImg } from "../config/index.json";
import { CDN_URL } from "../config/services";

interface StyledUlProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

export const StyledUl: React.FC<StyledUlProps> = ({ sx, children }) => (
  <Box component="ul" sx={{ "& li": { listStyleType: "circle" }, ...sx }}>
    {children}
  </Box>
);

const Footer: React.FC = () => {
  const theme = useTheme(); // 添加这行代码来获取当前主题

  // 根据主题的模式选择不同的背景图片
  const background =
    theme.palette.mode === "dark"
      ? `url(${CDN_URL}/bg/tesla-vector-roadster.png!/compress/true/fw/400)`
      : `url(${CDN_URL}/bg/${backgroundImg[Math.floor(Math.random() * backgroundImg.length)]}!/compress/true/fw/400)`;

  return (
    <Grid container component={Container} maxWidth="lg" sx={{ minHeight: 200, paddingTop: 16 }}>
      <Hr style={{ margin: "2rem 0" }} />
      <Grid
        item
        container
        sx={{
          backgroundImage: background,
          backgroundPosition: "right 20px bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: 200,
        }}
      >
        <Grid item xs={12} sm={5}>
          <Typography variant="h5" component="h3">
            说明
          </Typography>
          <StyledUl>
            <li>拥抱新技术、新生态，做一个现代化的程序员</li>
            <li>如果您有任何意见或建议，请随时联系：QQ5968251</li>
            <li>If there is any copyright infringement, please notify us at once and we&apos;ll delete it.</li>
          </StyledUl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            长期计划
          </Typography>
          <StyledUl>
            <li>健康</li>
            <li>英语</li>
            <li>PHP + JavaScript</li>
            <li>实时的应用、游戏</li>
            <li>TDD、算法和底层等</li>
          </StyledUl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="h5" component="h3">
            其他
          </Typography>
          <ul>
            <li>
              <RouteLink to="/project/1">代办事项</RouteLink>
            </li>
            <Tooltip title="GitHub 存储库" aria-label="GitHub 存储库">
              <IconButton
                component="a"
                href="https://github.com/dogeow/antic"
                color="inherit"
                size="large"
                target="_blank"
                rel="noopener noreferrer"
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

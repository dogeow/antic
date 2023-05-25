import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  AppBar,
  Button,
  Container,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import Drawer from "../components/site/Drawer";
import Logo from "../components/site/Logo";
import config from "../config/index.json";
import ProfileMenu from "../containers/ProfileMenu";
import SearchButton from "../containers/SearchButton";
import { isExpiredState, isSettingsOpenState, paletteModeState } from "../states";

const useStyles = makeStyles(() => ({
  blank: {
    flexGrow: 1,
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const Header = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [isExpired] = useRecoilState(isExpiredState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [, setSettingsOpen] = useRecoilState(isSettingsOpenState);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playing) {
      const audio = document.getElementById("music");
      audio.addEventListener(
        "ended",
        () => {
          setPlaying(!playing);
        },
        false
      );
      return () => {
        audio.removeEventListener(
          "ended",
          () => {
            setPlaying(!playing);
          },
          false
        );
      };
    }
  }, [playing]);

  /**
   * 设置开关
   */
  const handleSettingOpen = useCallback(() => {
    setAnchorEl(null);
    setSettingsOpen(true);
  }, [setAnchorEl, setSettingsOpen]);

  const handleMenu = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleMobileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const playMusic = () => {
    const audio = document.getElementById("music");
    const root = document.getElementById("root");
    if (audio === null) {
      const audio = document.createElement("audio");
      audio.id = "music";
      audio.src =
        "https://upyun.dogeow.com/music/%E5%92%8C%E6%A5%BD%E5%99%A8%E3%83%90%E3%83%B3%E3%83%89%20-%20%E6%9D%B1%E9%A2%A8%E7%A0%B4.mp3";
      root.append(audio);
      setPlaying(!playing);
      audio.play();
    } else {
      if (audio.paused) {
        setPlaying(!playing);
        audio.play();
      } else {
        setPlaying(!playing);
        audio.pause();
      }
    }
  };

  return (
    <header>
      <Drawer open={toggleDrawer} onClick={() => setToggleDrawer(!toggleDrawer)} />
      <AppBar position="static" component="div">
        <Container maxWidth="lg" style={{ paddingRight: 0 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setToggleDrawer(!toggleDrawer)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Logo shadow={true} />
            </Link>
            {matches && (
              <div style={{ marginLeft: 6 }}>
                {config.menus.map((menu, index) => (
                  <Button color="inherit" component={Link} to={menu.url} key={index}>
                    {menu.name}
                  </Button>
                ))}
              </div>
            )}
            <div className={classes.blank} />
            <SearchButton />
            <Hidden only="xs">
              <Tooltip
                title="切换白天或夜晚主题"
                aria-label="切换白天或夜晚主题"
                onClick={() => {
                  setPaletteMode(paletteMode === "light" ? "dark" : "light");
                  document.documentElement.setAttribute(
                    "data-prefers-color-scheme",
                    paletteMode === "light" ? "dark" : "light"
                  );
                }}
              >
                <IconButton color="inherit" size="large">
                  {paletteMode === "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="播放音乐" aria-label="播放音乐" onClick={playMusic}>
                <IconButton color="inherit" size="large">
                  {playing ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                </IconButton>
              </Tooltip>
            </Hidden>
            {isExpired ? (
              <Tooltip title="登录" aria-label="登录">
                <Link to={{ pathname: "/login" }} state={{ from: pathname }}>
                  <IconButton color="inherit" size="large">
                    <PersonIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            ) : (
              <ProfileMenu />
            )}
            <Tooltip title="更多" aria-label="更多" onClick={handleMenu}>
              <IconButton aria-label="show more" aria-controls="menu" aria-haspopup="true" color="inherit" size="large">
                <MoreIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={isMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setPaletteMode(paletteMode === "light" ? "dark" : "light");
                  document.documentElement.setAttribute(
                    "data-prefers-color-scheme",
                    paletteMode === "light" ? "dark" : "light"
                  );
                }}
              >
                切换为
                {paletteMode === "dark" ? "白天☀️️" : "黑夜🌌"}
                模式
              </MenuItem>
              <MenuItem onClick={handleSettingOpen}>网站设置</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;

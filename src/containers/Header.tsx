import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
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
import { AxiosResponse } from "axios";
import produce from "immer";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import Drawer from "../components/site/Drawer";
import Logo from "../components/site/Logo";
import SearchButton from "../containers/SearchButton";
import { getGravatarAddress } from "../helpers";
import { getItem } from "../helpers";
import { logout } from "../helpers/auth";
import axios from "../instance/axios";
import { logoutRequest } from "../requests/user";
import {
  isExpiredState,
  isSettingsOpenState,
  isSnackOpenState,
  paletteModeState,
  snackMessageState,
  usersState,
  userState,
} from "../states";

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
  const [user, setUser] = useRecoilState(userState);
  const [users, setUsers] = useRecoilState(usersState);
  const [isExpired, setIsExpired] = useRecoilState(isExpiredState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [, setSnackMessage] = useRecoilState(snackMessageState);
  const [, setIsSnackOpen] = useRecoilState(isSnackOpenState);
  const [, setSettingsOpen] = useRecoilState(isSettingsOpenState);
  const profileOpen = Boolean(mobileMoreAnchorEl);
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
  function handleSettingOpen() {
    setAnchorEl(null);
    setSettingsOpen(true);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenu = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseProfile = () => {
    setMobileMoreAnchorEl(null);
  };

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
                <Button color="inherit" component={Link} to="/chat">
                  聊天室
                </Button>
                <Button color="inherit" component={Link} to="/game">
                  游戏
                </Button>
                <Button color="inherit" component={Link} to="/api">
                  API
                </Button>
                <Button color="inherit" component={Link} to="/demo">
                  DEMO
                </Button>
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
              <div>
                <Tooltip title="个人中心" aria-label="个人中心">
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="profile"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleProfileMenu}
                    size="large"
                  >
                    <Avatar alt={user.name} src={getGravatarAddress(user.email, 80)} />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="profile"
                  anchorEl={mobileMoreAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={profileOpen}
                  onClose={handleCloseProfile}
                >
                  <Link to={`/user/${user.id}`} onClick={handleCloseProfile}>
                    <div style={{ textAlign: "center", fontSize: "1rem" }}>
                      <Avatar
                        alt={user.name}
                        src={getGravatarAddress(user.email, 160)}
                        style={{ width: 80, height: 80, margin: "20px auto" }}
                      />
                      {user.name}
                    </div>
                  </Link>
                  {users.map((user, index) => {
                    return (
                      user.email !== user.email && (
                        <MenuItem
                          onClick={() => {
                            setUser(user);
                            handleCloseProfile();
                          }}
                          key={index}
                        >
                          <Avatar alt={user.name} src={getGravatarAddress(user.email, 160)} />
                          <span
                            style={{
                              margin: "0 10px 0 10px",
                              fontSize: "0.8rem",
                            }}
                          >
                            {user.name}
                            <br />
                            {user.email}
                          </span>
                        </MenuItem>
                      )
                    );
                  })}
                  <Divider />
                  <Link to="/login" onClick={() => handleCloseProfile()}>
                    <MenuItem>
                      <PersonAddIcon style={{ width: 40 }} />
                      <span style={{ margin: "0 10px 0 10px" }}>添加其他账号</span>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      setMobileMoreAnchorEl(null);
                      const requests: Promise<AxiosResponse>[] = [];
                      if (getItem("users")) {
                        (JSON.parse(localStorage.users) as User[]).map((user) => {
                          axios.defaults.headers.common.Authorization = user.accessToken;
                          requests.push(logoutRequest(user.accessToken));
                          Promise.all(requests).then(function ([acct, perms]) {
                            localStorage.removeItem("users");
                            setUsers([]);
                          });
                        });
                      }
                      if (getItem("user.accessToken")) {
                        logoutRequest(user.accessToken).then(() => {
                          setUser(
                            produce((draft: User) => {
                              draft.accessToken = "";
                            })
                          );
                          logout();
                        });
                        setIsExpired(true);
                      }
                      setSnackMessage("退出成功");
                      setIsSnackOpen(true);
                    }}
                  >
                    <LogoutIcon style={{ width: 40 }} />
                    <span style={{ margin: "0 10px 0 10px" }}>{localStorage.users ? "注销所有账号" : "注销"}</span>
                  </MenuItem>
                </Menu>
              </div>
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

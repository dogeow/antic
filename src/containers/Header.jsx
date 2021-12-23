import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  Alert as MuiAlert,
  AppBar,
  Avatar,
  Button,
  Container,
  Hidden,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import {
  changeUser,
  logoutAction,
  snackToggleAction,
  toggleDrawer as toggleDrawerAction,
  toggleTheme,
} from "actions";
import Drawer from "components/Drawer";
import Logo from "components/Logo";
import Search from "components/Search";
import Settings from "components/Settings";
import { gravatarCdn } from "config/services";
import { logout } from "helpers";
import axios from "instance/axios";
import md5 from "md5";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { useEvent } from "react-use";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  blank: {
    flexGrow: 1,
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  search: {
    display: "flex",
    padding: 4,
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    paddingRight: 4,
  },
  inputInput: {
    width: "8ch",
    color: "white",
    textAlign: "center",
    padding: "unset",
    fontSize: "1.5rem",
  },
}));

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const toggleDrawer = useSelector((state) => state.lab.toggleDrawer);
  const paletteMode = useSelector((state) => state.lab.paletteMode);
  const lab = useSelector((state) => state.lab);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const profileOpen = Boolean(mobileMoreAnchorEl);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [searching, setSearching] = useState(false);
  const [metaKey, setMetaKey] = useState(false);

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

  const onKeyDown = useCallback(
    ({ key }) => {
      // 不在搜索时才记录 Meta
      if (searching === false) {
        if (key === "k" && metaKey) {
          handleSearch();
          setMetaKey(false);
        } else if (key === "Meta") {
          setMetaKey(true);
        } else {
          setMetaKey(false);
        }
      } else {
        if (key === "Escape") {
          setSearching(false);
          setMetaKey(false);
        }
      }
    },
    [searching, metaKey]
  );

  const onKeyUp = useCallback(({ key }) => {
    if (key === "Meta") {
      setMetaKey(false);
    }
  }, []);

  useEvent("keyup", onKeyUp);
  useEvent("keydown", onKeyDown);

  /**
   * 设置开关
   */
  function handleSettingOpen() {
    setAnchorEl(null);
    setSettingsOpen(true);
  }

  const handleSettingClose = () => {
    setSettingsOpen(false);
  };

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

  const handleSearch = () => {
    setSearching(true);
  };

  const closeSearch = () => {
    setSearching(false);
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
      <Drawer
        open={toggleDrawer}
        onClick={() => dispatch(toggleDrawerAction())}
      />
      <AppBar position="static" component="div">
        <Container
          maxWidth="lg"
          classes={{
            root: classes.containerRoot,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => dispatch(toggleDrawerAction())}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <RouteLink to="/">
              <Logo />
            </RouteLink>
            {matches && (
              <div style={{ marginLeft: 6 }}>
                <Button color="inherit" component={RouteLink} to="/chat">
                  聊天室
                </Button>
                <Button color="inherit" component={RouteLink} to="/game">
                  游戏
                </Button>
                <Button color="inherit" component={RouteLink} to="/api">
                  API
                </Button>
                <Button color="inherit" component={RouteLink} to="/demo">
                  DEMO
                </Button>
              </div>
            )}
            <div className={classes.blank} />
            <Hidden lgDown>
              <div className={classes.search} onFocus={handleSearch}>
                <InputBase
                  placeholder="⌘ + k"
                  classes={{
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
                <div className={classes.searchIcon} onClick={handleSearch}>
                  <SearchIcon />
                </div>
              </div>
            </Hidden>
            <Hidden mdUp>
              <Tooltip
                title="搜索笔记"
                aria-label="搜索笔记"
                onClick={handleSearch}
              >
                <IconButton color="inherit" size="large">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Hidden>
            <Hidden only="xs">
              <Tooltip
                title="切换白天或夜晚主题"
                aria-label="切换白天或夜晚主题"
                onClick={() => dispatch(toggleTheme())}
              >
                <IconButton color="inherit" size="large">
                  {lab.paletteMode === "dark" ? (
                    <NightsStayIcon />
                  ) : (
                    <WbSunnyIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip
                title="播放音乐"
                aria-label="播放音乐"
                onClick={playMusic}
              >
                <IconButton color="inherit" size="large">
                  {playing === true ? (
                    <PauseCircleOutlineIcon />
                  ) : (
                    <PlayCircleOutlineIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Hidden>
            {lab.isExpired ? (
              <Tooltip title="登录" aria-label="登录">
                <IconButton
                  color="inherit"
                  component={RouteLink}
                  href="https://github.com/likunyan/antic"
                  to={{
                    pathname: "/login",
                    state: { from: pathname },
                  }}
                  size="large"
                >
                  <PersonIcon />
                </IconButton>
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
                    <Avatar
                      alt={lab.userName}
                      src={`${gravatarCdn}/${md5(
                        lab.userEmail
                      )}.jpg?d=monsterid&s=80`}
                    />
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
                  <RouteLink
                    to={`/user/${lab.userId}`}
                    onClick={handleCloseProfile}
                  >
                    <div style={{ textAlign: "center", fontSize: "1rem" }}>
                      <Avatar
                        alt={lab.userName}
                        src={`${gravatarCdn}/${md5(
                          lab.userEmail
                        )}.jpg?d=monsterid&s=160`}
                        style={{ width: 80, height: 80, margin: "0 auto" }}
                      />
                      {lab.userName}
                    </div>
                  </RouteLink>
                  {lab.users.map((user, index) => {
                    return (
                      user.userEmail !== lab.userEmail && (
                        <MenuItem
                          onClick={() => {
                            dispatch(changeUser(user));
                            handleCloseProfile();
                          }}
                          key={index}
                        >
                          <Avatar
                            alt={user.userName}
                            src={`${gravatarCdn}/${md5(
                              user.userEmail
                            )}.jpg?d=monsterid&s=160`}
                          />
                          <span
                            style={{
                              margin: "0 10px 0 10px",
                              fontSize: "0.8rem",
                            }}
                          >
                            {user.userName}
                            <br />
                            {user.userEmail}
                          </span>
                        </MenuItem>
                      )
                    );
                  })}
                  <RouteLink to="/login" onClick={() => handleCloseProfile()}>
                    <MenuItem>
                      <PersonAddIcon style={{ width: 40 }} />
                      <span style={{ margin: "0 10px 0 10px" }}>
                        添加其他账号
                      </span>
                    </MenuItem>
                  </RouteLink>
                  <MenuItem
                    onClick={() => {
                      setMobileMoreAnchorEl(null);
                      const requests = [];
                      if (localStorage.users) {
                        JSON.parse(localStorage.users).map((user) => {
                          requests.push(
                            axios.post(
                              "/user/logout",
                              {},
                              {
                                headers: {
                                  Authorization: user.token,
                                },
                              }
                            )
                          );
                          Promise.all(requests).then(function ([acct, perms]) {
                            dispatch(logoutAction());
                            localStorage.removeItem("users");
                          });
                        });
                      }
                      logout();
                    }}
                  >
                    退出所有账号
                  </MenuItem>
                </Menu>
              </div>
            )}
            <Tooltip title="更多" aria-label="更多" onClick={handleMenu}>
              <IconButton
                aria-label="show more"
                aria-controls="menu"
                aria-haspopup="true"
                color="inherit"
                size="large"
              >
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
                  dispatch(toggleTheme());
                }}
              >
                切换为
                {lab.paletteMode === "dark" ? "白天☀️️" : "黑夜🌌"}
                模式
              </MenuItem>
              <MenuItem onClick={handleSettingOpen}>网站设置</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Search searching={searching} closeSearch={closeSearch} />
      <Settings
        open={settingsOpen}
        onClose={handleSettingClose}
        onThemeClick={() => dispatch(toggleTheme())}
        paletteMode={paletteMode}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={lab.snackOpen}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }

          dispatch(snackToggleAction());
        }}
      >
        <Alert
          severity="success"
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }

            dispatch(snackToggleAction());
          }}
        >
          {lab.snackMessage}
        </Alert>
      </Snackbar>
    </header>
  );
};

export default Header;

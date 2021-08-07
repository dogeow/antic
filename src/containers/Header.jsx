import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MuiAlert from "@material-ui/lab/Alert";
import Drawer from "components/Drawer";
import Logo from "components/Logo";
import Search from "components/Search";
import Settings from "components/Settings";
import { gravatarCdn } from "config/services";
import md5 from "md5";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
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

/**
 * 菜单栏
 * @param {object} lab
 * @param {function} onLogout
 * @param {boolean} onClickDrawer
 * @param {function} toggleDrawer
 * @param {function} onThemeClick
 * @param {function} snackClose
 * @param {function} paletteMode
 * @param {function} onChangeUser
 * @return {JSX.Element}
 * @constructor
 */
const Header = ({
  lab,
  onLogout,
  onClickDrawer,
  toggleDrawer,
  onThemeClick,
  snackClose,
  paletteMode,
  onChangeUser,
}) => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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
      <Drawer open={toggleDrawer} onClick={onClickDrawer} />
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
              onClick={onClickDrawer}
            >
              <MenuIcon />
            </IconButton>
            <RouteLink to="/">
              <Logo />
            </RouteLink>
            {matches && (
              <div style={{ marginLeft: 12 }}>
                <Button color="inherit" component={RouteLink} to="/posts">
                  笔记
                </Button>
                <Button color="inherit" component={RouteLink} to="/chat">
                  聊天室♂
                </Button>
                <Button color="inherit" component={RouteLink} to="/demo">
                  DEMO
                </Button>
              </div>
            )}
            <div className={classes.blank} />
            <Hidden smDown>
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
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Hidden>
            <Hidden only="xs">
              <Tooltip
                title="切换白天或夜晚主题"
                aria-label="切换白天或夜晚主题"
                onClick={onThemeClick}
              >
                <IconButton color="inherit">
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
                <IconButton color="inherit">
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
                    onClick={() => handleCloseProfile()}
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
                            onChangeUser(user);
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
                      onLogout();
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
                  onThemeClick();
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
        onThemeClick={onThemeClick}
        paletteMode={paletteMode}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={lab.snackOpen}
        autoHideDuration={2000}
        onClose={snackClose}
      >
        <Alert severity="success" onClose={snackClose}>
          {lab.snackMessage}
        </Alert>
      </Snackbar>
    </header>
  );
};

Header.propTypes = {
  lab: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onClickDrawer: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.bool.isRequired,
  onThemeClick: PropTypes.func.isRequired,
  paletteMode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default Header;

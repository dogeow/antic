import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GitHub from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import md5 from "md5";
import PropTypes from "prop-types";
import * as React, { useState } from "react";
import { Link as RouteLink, useHistory } from "react-router-dom";

import Drawer from "../components/Drawer";
import Logo from "../components/Logo";
import Settings from "../components/Settings";
import { gravatarCdn } from "../config/services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  blank: {
    flexGrow: 1,
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

/**
 * 菜单栏
 * @param {object} lab
 * @param {function} onLogout
 * @param {function} onTestLogin
 * @param {boolean} onClickDrawer
 * @param {function} toggleDrawer
 * @param {function} onThemeClick
 * @param {function} paletteMode
 * @return {JSX.Element}
 * @constructor
 */
const Header = ({
  lab,
  onLogout,
  onTestLogin,
  onClickDrawer,
  toggleDrawer,
  onThemeClick,
  paletteMode,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const profileOpen = Boolean(mobileMoreAnchorEl);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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

  const playMusic = () => {
    const audio = document.getElementById("music");
    const root = document.getElementById("root");
    if (audio === null) {
      const audio = document.createElement("audio");
      audio.id = "music";
      audio.src =
        "https://cdn.gugelong.com/music/%E5%92%8C%E6%A5%BD%E5%99%A8%E3%83%90%E3%83%B3%E3%83%89%20-%20%E6%9D%B1%E9%A2%A8%E7%A0%B4.mp3";
      root.append(audio);
      setPlaying(true);
      audio.play();
    } else {
      if (audio.paused) {
        setPlaying(true);
        audio.play();
      } else {
        setPlaying(false);
        audio.pause();
      }
    }
  };

  const handleEnterChat = () => {
    if (localStorage.userName === undefined) {
      setOpen(true);
      return;
    }

    history.push("/chat");
  };

  const handleRegister = () => {
    setOpen(false);
    history.push("/register");
  };

  return (
    <header className={classes.root}>
      <Drawer open={toggleDrawer} onClick={onClickDrawer} />
      <AppBar position="static">
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
                <Button color="inherit" onClick={handleEnterChat}>
                  聊天室♂
                </Button>
                <Button color="inherit" component={RouteLink} to="/posts">
                  笔记
                </Button>
                <Button color="inherit" component={RouteLink} to="/categories">
                  分类
                </Button>
                <Button color="inherit" component={RouteLink} to="/tags">
                  标签
                </Button>
                <Button
                  color="inherit"
                  style={{ marginLeft: 16 }}
                  component={RouteLink}
                  to="/project/1"
                >
                  Todo
                </Button>
              </div>
            )}
            <div className={classes.blank} />
            <Hidden only="xs">
              <Tooltip
                title="切换白天或夜晚主题"
                aria-label="切换白天或夜晚主题"
              >
                <IconButton color="inherit" onClick={onThemeClick}>
                  {lab.paletteMode === "dark" ? (
                    <NightsStayIcon />
                  ) : (
                    <WbSunnyIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="播放音乐" aria-label="播放音乐">
                <IconButton color="inherit" onClick={playMusic}>
                  {playing === true ? (
                    <PauseCircleOutlineIcon />
                  ) : (
                    <PlayCircleOutlineIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="GitHub 存储库" aria-label="GitHub 存储库">
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://github.com/likunyan/antic"
                  target="_blank"
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
            </Hidden>
            {lab.isExpired ? (
              <Button color="inherit" component={RouteLink} to="/login">
                登录
              </Button>
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
                      src={`${gravatarCdn}/${md5(lab.userEmail)}.jpg?d=mp&s=80`}
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
                    <MenuItem>{lab.userName}</MenuItem>
                  </RouteLink>
                  <RouteLink
                    to={`/user/${lab.userId}/setting`}
                    onClick={() => handleCloseProfile()}
                  >
                    <MenuItem>个人设置</MenuItem>
                  </RouteLink>
                  <MenuItem
                    onClick={() => {
                      setMobileMoreAnchorEl(null);
                      onLogout();
                    }}
                  >
                    登出
                  </MenuItem>
                </Menu>
              </div>
            )}
            <Tooltip title="更多" aria-label="更多">
              <IconButton
                aria-label="show more"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenu}
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
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onTestLogin();
                }}
              >
                登录测试账号
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/posts/create");
                }}
              >
                新建文章
              </MenuItem>
              <MenuItem onClick={handleSettingOpen}>网站设置</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
      <Settings
        open={settingsOpen}
        onClose={handleSettingClose}
        onThemeClick={onThemeClick}
        paletteMode={paletteMode}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"请先登录"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            以让他人知道您的尊姓大名和头像。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegister} autoFocus>
            注册
          </Button>
          <Button component={RouteLink} to="/login">
            登录
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

Header.propTypes = {
  lab: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onTestLogin: PropTypes.func.isRequired,
  onClickDrawer: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.bool.isRequired,
  onThemeClick: PropTypes.func.isRequired,
  paletteMode: PropTypes.oneOf(["dark", "light"]).isRequired,
};

export default Header;

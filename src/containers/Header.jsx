import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GitHub from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import md5 from "md5";
import React from "react";
import { Link as RouteLink, useHistory } from "react-router-dom";

import Drawer from "../components/Drawer";
import Logo from "../components/Logo";
import Settings from "../components/Settings";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  blank: {
    flexGrow: 1,
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const Header = ({
  lab,
  onLogout,
  onTestLogin,
  onClickDrawer,
  toggle_drawer,
  onThemeClick,
  themePaletteType,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMyself, setAnchorElMyself] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMyself = Boolean(anchorElMyself);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

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

  const handleMenuMyself = (event) => {
    setAnchorElMyself(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMyself = () => {
    setAnchorElMyself(null);
  };

  return (
    <header className={classes.root}>
      <Settings
        open={settingsOpen}
        onClose={handleSettingClose}
        onThemeClick={onThemeClick}
        themePaletteType={themePaletteType}
      />
      <Drawer open={toggle_drawer} onClick={onClickDrawer} />
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
              className={classes.menuButton}
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
              <>
                <Button
                  color="inherit"
                  style={{ marginLeft: 16 }}
                  component={RouteLink}
                  to="/posts"
                >
                  笔记
                </Button>
                <Button color="inherit" component={RouteLink} to="/categories">
                  分类
                </Button>
                <Button color="inherit" component={RouteLink} to="/tags">
                  标签
                </Button>
              </>
            )}
            <div className={classes.blank} />
            <Hidden only="xs">
              <IconButton
                aria-label="GitHub 存储库"
                color="inherit"
                component="a"
                href="https://github.com/likunyan/antic"
                target="_blank"
              >
                <GitHub />
              </IconButton>
              <IconButton
                aria-label="切换模式"
                color="inherit"
                onClick={onThemeClick}
              >
                {lab.themePaletteType === "dark" ? (
                  <NightsStayIcon />
                ) : (
                  <WbSunnyIcon />
                )}
              </IconButton>
            </Hidden>
            {lab.is_expired ? (
              <Button color="inherit" component={RouteLink} to="/login">
                登录
              </Button>
            ) : (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="myself-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleMenuMyself}
                >
                  <Avatar
                    alt={lab.user_name}
                    src={`https://gravatar.loli.net/avatar/${md5(
                      lab.user_email
                    )}.jpg?d=mp&s=80`}
                  />
                </IconButton>
                <Menu
                  id="myself-appbar"
                  anchorEl={anchorElMyself}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openMyself}
                  onClose={handleCloseMyself}
                >
                  <RouteLink
                    to={`/user/${lab.user_id}`}
                    onClick={() => handleCloseMyself()}
                  >
                    <MenuItem>{lab.user_name}</MenuItem>
                  </RouteLink>
                  <RouteLink
                    to={`/user/${lab.user_id}/setting`}
                    onClick={() => handleCloseMyself()}
                  >
                    <MenuItem>个人设置</MenuItem>
                  </RouteLink>
                  <MenuItem
                    onClick={() => {
                      setAnchorElMyself(null);
                      onLogout();
                    }}
                  >
                    登出
                  </MenuItem>
                </Menu>
              </div>
            )}
            <IconButton
              aria-label="show more"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  onThemeClick();
                }}
              >
                切换为
                {lab.themePaletteType === "dark" ? "白天☀️️" : "黑夜🌌"}
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
    </header>
  );
};

export default Header;

import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import md5 from 'md5'
import axios from 'axios'
import Swal from 'sweetalert2'
import { logged } from '../helpers'
import { loginAction } from "../actions";

// Material-UI
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'

// 组件
import Logo from '../components/Logo'
import Drawer from '../components/Drawer'
import Settings from '../components/Settings'

import { logout } from '../helpers/index'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  containerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  }
}));

const Header = ({lab, onClickDrawer, toggle_drawer, onThemeClick, themePaletteType}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuMyself = event => {
    setAnchorElMyself(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMyself = () => {
    setAnchorElMyself(null);
  };

  const handleLogout = () => {
    setAnchorElMyself(null);
    logout();
    dispatch({type: 'LOGOUT'});
    axios.post("user/logout").then(() => {
      Swal.fire('注销成功！')
    });
  };

  const testLogin = () => {
    axios.post("user/login", {
      email: 'test@test.com',
      password: 'test@test.com',
      remember_me: true
    }).then(response => {
      let {access_token} = response.data;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      axios.post("user/profile").then(response2 => {
        let {id, name, email} = response2.data.user;
        logged(response.data, response2.data.user);
        dispatch(loginAction(access_token, id, name, email));
      });
    })
  };

  return (
    <header className={classes.root}>
      <Settings
        open={settingsOpen}
        onClose={handleSettingClose}
        onThemeClick={onThemeClick}
        themePaletteType={themePaletteType}
      />
      <Drawer open={toggle_drawer} onClick={onClickDrawer}/>
      <AppBar position="static">
        <Container maxWidth="lg" classes={{
          root: classes.containerRoot
        }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onClickDrawer}
            >
              <MenuIcon/>
            </IconButton>
            <Link to={'/'} className={classes.title}>
              <Logo/>
            </Link>
            {
              lab.is_expired ? (
                <Link to={'/login'}><Button color="inherit">登录</Button></Link>
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
                      src={`https://gravatar.loli.net/avatar/${md5(lab.user_email)}.jpg?d=mp&s=80`}
                    />
                  </IconButton>
                  <Menu
                    id="myself-appbar"
                    anchorEl={anchorElMyself}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openMyself}
                    onClose={handleCloseMyself}
                  >
                    <Link to={`/user/${lab.user_id}`} onClick={() => handleCloseMyself()}>
                      <MenuItem>{lab.user_name}</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout}>注销</MenuItem>
                  </Menu>
                </div>
              )
            }
            <IconButton
              aria-label="show more"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                setAnchorEl(null);
                onThemeClick();
              }}>
                切换为{lab.themePaletteType === "dark" ? "白天☀️️" : "黑夜🌌"}模式
              </MenuItem>
              <MenuItem onClick={() => {
                setAnchorEl(null);
                testLogin();
              }}>测试账号登录</MenuItem>
              <MenuItem onClick={() => {
                setAnchorEl(null);
                history.push('/post/create');
              }}>新建文章</MenuItem>
              <MenuItem onClick={handleSettingOpen}>设置</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;

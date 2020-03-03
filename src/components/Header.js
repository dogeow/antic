import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import md5 from 'md5'
import axios from 'axios'
import Swal from 'sweetalert2'

// Material-UI
import makeStyles from '@material-ui/core/styles/makeStyles'
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
import Drawer from './Drawer'
import Snackbar from './Snackbar'
import Settings from './Settings'

import {logout} from '../helpers/index'

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

const Header = ({lab, is_expired, onClickDrawer, toggle_snackbar, toggle_drawer, onThemeClick, themePaletteType}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
    dispatch({type: 'LOGOUT'});
    logout();
    axios.post("user/logout")
      .then(() => {
        Swal.fire('注销成功！')
      });
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
      <Snackbar toggle_snackbar={toggle_snackbar}/>
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
            {is_expired ? (
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
            )}
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
              <MenuItem onClick={handleSettingOpen}>设置</MenuItem>
              <MenuItem onClick={onThemeClick}>
                {lab.themePaletteType === "dark" ? "黑夜🌌" : "白天☀️️"}模式
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;

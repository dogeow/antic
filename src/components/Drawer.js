import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const menus = [
  {'name': '🙀表情', 'url': '/emoji'},
  {'name': '🔝微博热搜榜', 'url': '/weibo'},
  {'name': '🧭网址导航', 'url': '/nav'},
  {'name': '🔖谷歌书签', 'url': '/bookmarks'},
  {'name': '🎹钢琴（卡农）', 'url': '/piano'},
  {'name': '⚙️便民 API', 'url': '/api'},
  {'name': '📋Todo', 'url': '/todo'},
  {'name': '🤔自言自语', 'url': '/self-talk'},
  {'name': '☀️名人堂', 'url': '/hall_of_fame'},
  {'name': '📦一些 Demo', 'url': '/demo'},
];

const externalMenus = [
  {'name': '📝学习笔记（博客）', 'url': 'https://www.kunyan.li'},
  {'name': '🗂️学习笔记（维基）', 'url': 'https://wiki.kunyan.li'},
  {'name': '🖌️Canvas 学习', 'url': 'http://canvas.kunyan.li'},
];

export default function TemporaryDrawer(props) {
  const classes = useStyles();

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.onClick();
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {menus.map((menu, index) => (
          <ListItem button to={menu.url} component={RouteLink} key={index}>
            <ListItemText primary={menu.name}/>
          </ListItem>
        ))}
        <Divider/>
        {externalMenus.map((menu, index) => (
          <ListItem button component={Link} style={{cursor: 'alias'}} href={menu.url} key={index}>
            <ListItemText primary={menu.name}/>
          </ListItem>
        ))}
        <Divider/>
        <ListItem button to={'/about'} component={RouteLink}>
          <img src="/favicon.ico" alt="antic" style={{height: 19, marginRight: 4}}/>
          <ListItemText primary="关于我"/>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.open} onClose={toggleDrawer()}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

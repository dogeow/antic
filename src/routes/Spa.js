import React from 'react';
import {Route, Switch} from 'react-router-dom';
import loadable from '@loadable/component';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';

import Index from '../containers/Index';
import Header from '../components/Header';
import Footer from '../containers/Footer';

const useStyles = makeStyles(theme => ({
  main: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  backToTop: {
    width: 50,
    height: 50,
    position: 'fixed',
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
}));

const Spa = ({match}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <Container
        maxWidth={['/post/create'].includes(match.url) ? null : 'lg'}
        style={{marginTop: 20}}
        classes={['/nav'].includes(match.url) ? {root: classes.main} : null}>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/game"
                 component={loadable(() => import('../containers/Game'))}/>
          <Route path="/algolia"
                 component={loadable(() => import('../containers/Algolia'))}/>
          <Route exact path="/post"
                 component={loadable(() => import('../containers/Post'))}/>
          <Route path="/post/create" component={loadable(
            () => import('../components/PostCreate'))}/>
          <Route path="/post/:id/edit" component={loadable(
            () => import('../components/PostCreate'))}/>
          <Route path="/post/:id" component={loadable(
            () => import('../containers/PostSingle'))}/>
          <Route path="/register"
                 component={loadable(() => import('../containers/Register'))}/>
          <Route exact path="/api"
                 component={loadable(() => import('../containers/Api'))}/>
          <Route path="/sqg"
                 component={loadable(() => import('../components/Sqg'))}/>
          <Route path="/about"
                 component={loadable(() => import('../containers/About'))}/>
          <Route exact path="/weibo"
                 component={loadable(() => import('../containers/Weibo'))}/>
          <Route path="/weibo/about" component={loadable(
            () => import('../containers/WeiboAbout'))}/>
          <Route exact path="/emoji"
                 component={loadable(() => import('../components/Emoji'))}/>
          <Route path="/emoji/post" component={loadable(
            () => import('../components/Emoji/EmojiPost'))}/>
          <Route exact path="/todo" component={loadable(
            () => import('../components/Todo/ProjectsList'))}/>
          <Route path="/todo/create" component={loadable(
            () => import('../components/Todo/NewProject'))}/>
          <Route path="/todo/:id" component={loadable(
            () => import('../components/Todo/SingleProject'))}/>
          <Route path="/self-talk"
                 component={loadable(() => import('../containers/SelfTalk'))}/>
          <Route path="/hall_of_fame"
                 component={loadable(
                   () => import('../containers/HallOfFame'))}/>
          <Route path="/nav"
                 component={loadable(() => import('../components/Nav'))}/>
          <Route path="/a-z"
                 component={loadable(() => import('../containers/A2Z'))}/>
          <Route path="/piano"
                 component={loadable(() => import('../components/Piano'))}/>
          <Route path="/bookmarks"
                 component={loadable(() => import('../containers/Bookmarks'))}/>
          <Route path="/search"
                 component={loadable(() => import('../components/Search'))}/>
          <Route path="/user/:id"
                 component={loadable(() => import('../containers/User'))}/>
          <Route exact path="/demo"
                 component={loadable(() => import('../containers/Demo'))}/>
          <Route path="/demos/chess"
                 component={loadable(() => import('../containers/Chess'))}/>
          <Route path="/demos/clock"
                 component={loadable(() => import('../demo/Clock'))}/>
          <Route path="/demos/calculator"
                 component={loadable(() => import('../demo/Calculator'))}/>
          <Route path="/demos/parking"
                 component={loadable(() => import('../containers/Parking'))}/>
          <Route path="/demos/font"
                 component={loadable(() => import('../demo/Font'))}/>
          <Route path="/powered-by"
                 component={loadable(() => import('../containers/PoweredBy'))}/>
          <Route path="/test"
                 component={loadable(() => import('../containers/Test'))}/>
          <Route component={loadable(() => import('../containers/NoMatch'))}/>
        </Switch>
      </Container>
      {['/'].includes(match.url) && <Footer/>}
      <div id="back_top" className={classes.backToTop}>
        <a href="#root"><LocalAirportIcon alt="Back to top arrow"/></a>
      </div>
    </>
  );
};

export default Spa;

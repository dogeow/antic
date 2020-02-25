import React from 'react'
import { Route, Switch } from 'react-router-dom'

import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'

// Pages
import Register from '../containers/Register'
import Index from '../containers/Index'
import About from '../containers/About'
import Nav from '../components/Nav'
import Search from '../components/Search'
import Api from '../containers/Api'
import Todo from '../components/Todo/ProjectsList'
import CreateTodoProject from '../components/Todo/NewProject'
import TodoProject from '../components/Todo/SingleProject'
import Weibo from '../containers/Weibo'
import SelfTalk from '../containers/SelfTalk'
import Emoji from '../components/Emoji'
import EmojiPost from '../components/Emoji/EmojiPost'
import Bookmarks from '../containers/Bookmarks'
import User from '../containers/User'
import Sqg from '../components/Sqg'
import Piano from '../components/Piano'
import Parking from '../containers/Parking'
import HallOfFame from '../containers/HallOfFame'
import Demo from '../containers/Demo'

// Layouts
import Header from '../containers/Header'
import NoMatch from '../containers/NoMatch'

// Demos
import Clock from '../demo/Clock'
import Calculator from '../demo/Calculator/'
import Topics from '../demo/Topics'
import Chess from '../containers/Chess'
import Mv from '../demo/Mv'
import Markdown from '../demo/Markdown'
import MarkdownEditor from '../demo/MarkdownEditor'

import Test from '../components/Test'

const useStyles = makeStyles(theme => ({
  main: {
    paddingLeft: 0,
    paddingRight: 0,
  }
}));

const Spa = ({match}) => {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <Container
        maxWidth="lg"
        style={{marginTop: 20}}
        classes={["/nav"].includes(match.url) ? {root: classes.main} : null}>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/register" component={Register}/>
          <Route path="/about" component={About}/>
          <Route exact path="/api" component={Api}/>
          <Route path="/sqg" component={Sqg}/>
          <Route path="/about" component={About}/>
          <Route path="/weibo" component={Weibo}/>
          <Route exact path="/emoji" component={Emoji}/>
          <Route path="/emoji/post" component={EmojiPost}/>
          <Route exact path="/todo" component={Todo}/>
          <Route path="/todo/create" component={CreateTodoProject}/>
          <Route path="/todo/:id" component={TodoProject}/>
          <Route path="/self-talk" component={SelfTalk}/>
          <Route path="/hall_of_fame" component={HallOfFame}/>
          <Route path="/nav" component={Nav}/>
          <Route path="/piano" component={Piano}/>
          <Route path="/bookmarks" component={Bookmarks}/>
          <Route path="/search" component={Search}/>
          <Route path="/user/:id" component={User}/>
          <Route exact path="/demo" component={Demo}/>
          <Route path="/demos/chess" component={Chess}/>
          <Route path="/demos/clock" component={Clock}/>
          <Route path="/demos/calculator" component={Calculator}/>
          <Route path="/demos/topics" component={Topics}/>
          <Route path="/demos/parking" component={Parking}/>
          <Route path="/demos/mv" component={Mv}/>
          <Route path="/demos/markdown" component={Markdown}/>
          <Route path="/demos/markdown-editor" component={MarkdownEditor}/>
          <Route path="/test" component={Test}/>
          <Route component={NoMatch}/>
        </Switch>
      </Container>
    </>
  )
};

export default Spa;

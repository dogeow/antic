import loadable from "@loadable/component";
import Loading from "components/Loading";
import Index from "containers";
import Redirect from "containers/users/Redirect";
import React from "react";
import { Route, Switch } from "react-router-dom";

export default () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/redirect" component={Redirect} />
    <Route
      exact
      path="/posts"
      component={loadable(() => import("components/post/PostList"))}
    />
    <Route
      path="/posts/create"
      component={loadable(() => import("components/post/PostCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/posts/:id/edit"
      component={loadable(() => import("components/post/PostCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/posts/:id"
      component={loadable(() => import("components/post/PostSingle"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/reset/:secret"
      component={loadable(() => import("containers/users/Reset"))}
    />
    <Route
      path="/bookmarks"
      component={loadable(() => import("containers/Bookmarks"))}
    />
    <Route
      path="/progress"
      component={loadable(() => import("containers/Progress"))}
    />
    <Route
      path="/categories"
      component={loadable(() => import("containers/post/AllCategories"))}
    />
    <Route path="/tags" component={loadable(() => import("containers/Tags"))} />
    <Route
      path="/register"
      component={loadable(() => import("containers/users/Register"))}
    />
    <Route
      exact
      path="/forget"
      component={loadable(() => import("containers/auth/Forget"))}
    />
    <Route
      path="/forget/:secret"
      component={loadable(() => import("containers/auth/EmailVerify"))}
    />
    <Route
      exact
      path="/api"
      component={loadable(() => import("containers/tools/Api"))}
    />
    <Route
      exact
      path="/api/time"
      component={loadable(() => import("containers/tools/Time"))}
    />
    <Route
      path="/about"
      component={loadable(() => import("containers/site/About"))}
    />
    <Route
      exact
      path="/weibo"
      component={loadable(() => import("containers/Weibo"))}
    />
    <Route
      path="/weibo/about"
      component={loadable(() => import("containers/WeiboAbout"))}
    />
    <Route
      exact
      path="/emoji"
      component={loadable(() => import("components/Emoji"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/emoji/create"
      component={loadable(() => import("components/Emoji/EmojiCreate"), {
        fallback: <Loading />,
      })}
    />
    <Route
      exact
      path="/project"
      component={loadable(() => import("components/Task/Project"))}
    />
    <Route
      path="/project/create"
      component={loadable(() => import("components/Task/NewProject"))}
    />
    <Route
      path="/project/:id"
      component={loadable(() => import("components/Task/SingleProject"))}
    />
    <Route
      path="/todo"
      component={loadable(() => import("components/TodoList"))}
    />
    <Route
      path="/self-talk"
      component={loadable(() => import("containers/me/SelfTalk"), {
        fallback: <Loading />,
      })}
    />
    <Route path="/like" component={loadable(() => import("components/Like"))} />
    <Route path="/nav" component={loadable(() => import("components/Nav"))} />
    <Route
      path="/a-z"
      component={loadable(() => import("containers/tools/A2Z"))}
    />
    <Route
      path="/piano"
      component={loadable(() => import("components/Piano"))}
    />
    <Route
      path="/bookmark/create"
      component={loadable(() => import("containers/BookmarkCreate"))}
    />
    <Route
      path="/bookmarks/old"
      component={loadable(() => import("containers/Bookmarks"))}
    />
    <Route path="/ndd" component={loadable(() => import("components/Ndd"))} />
    <Route
      exact
      path="/user/:id"
      component={loadable(() => import("containers/users/User"))}
    />
    <Route
      path="/user/:id/setting"
      component={loadable(() => import("containers/users/UserSetting"))}
    />
    <Route
      exact
      path="/demo"
      component={loadable(() => import("containers/Demo"))}
    />
    <Route
      path="/demos/calculator"
      component={loadable(() => import("demo/Calculator"))}
    />
    <Route
      path="/demos/parking"
      component={loadable(() => import("containers/tools/Parking"))}
    />
    <Route path="/demos/font" component={loadable(() => import("demo/Font"))} />
    <Route
      path="/powered_by"
      component={loadable(() => import("containers/site/PoweredBy"), {
        fallback: <Loading />,
      })}
    />
    <Route path="/like" component={loadable(() => import("components/Like"))} />
    <Route
      path="/cars"
      component={loadable(() => import("containers/me/Cars"), {
        fallback: <Loading />,
      })}
    />
    <Route
      path="/video"
      component={loadable(() => import("containers/demos/Video"))}
    />
    <Route
      path="/music"
      component={loadable(() => import("containers/demos/Music"))}
    />
    <Route
      path="/copywriting"
      component={loadable(() => import("containers/tools/Copywriting"))}
    />
    <Route path="/moon" component={loadable(() => import("containers/Moon"))} />
    <Route
      path="/php-function"
      component={loadable(() => import("containers/PHPFunction"))}
    />
    <Route path="/chat" component={loadable(() => import("containers/Chat"))} />
    <Route
      path="/base64"
      component={loadable(() => import("containers/tools/Base64"))}
    />
    <Route
      path="/money"
      component={loadable(() => import("containers/tools/Money"))}
    />
    <Route
      path="/color"
      component={loadable(() => import("containers/tools/Color"))}
    />
    <Route
      path="/goods"
      component={loadable(() => import("containers/goods"))}
    />
    <Route
      path="/docs"
      component={loadable(() => import("containers/site/Docs"))}
    />
    <Route
      path="/roads"
      component={loadable(() => import("containers/Roads"))}
    />
    <Route
      path="/mediawiki-to-markdown"
      component={loadable(() => import("containers/MediaWikiToMarkdown"))}
    />
    <Route
      path="/markdown"
      component={loadable(() => import("containers/markdown"))}
    />
    <Route path="/test" component={loadable(() => import("containers/Test"))} />
    <Route component={loadable(() => import("containers/NoMatch"))} />
  </Switch>
);

import * as React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../components/Loading";
import Redirect from "../containers/users/Redirect";
import Layout from "./Layout";

const PostList = lazy(() => import("../containers/post/PostList"));
const Login = lazy(() => import("../containers/users/Login"));
const SelfTalk = lazy(() => import("../containers/me/SelfTalk"));
const PoweredBy = lazy(() => import("../containers/site/PoweredBy"));
const Emoji = lazy(() => import("../components/emoji/Emoji"));
const EmojiCreate = lazy(() => import("../components/emoji/EmojiCreate"));
const PostCreate = lazy(() => import("../containers/post/PostCreate"));
const PostSingle = lazy(() => import("../containers/post/PostSingle"));
const Cars = lazy(() => import("../containers/me/Cars"));
const Reset = lazy(() => import("../containers/users/Reset"));
const Bookmarks = lazy(() => import("../containers/Bookmarks"));
const AllCategories = lazy(() => import("../containers/post/AllCategories"));
const Tags = lazy(() => import("../containers/Tags"));
const Register = lazy(() => import("../containers/users/Register"));
const Forget = lazy(() => import("../containers/auth/Forget"));
const EmailVerify = lazy(() => import("../containers/auth/EmailVerify"));
const Api = lazy(() => import("../containers/tools/Api"));
const Time = lazy(() => import("../containers/tools/Time"));
const About = lazy(() => import("../containers/site/About"));
const Weibo = lazy(() => import("../containers/demos/Weibo"));
const WeiboAbout = lazy(() => import("../containers/demos/WeiboAbout"));
const Project = lazy(() => import("../components/task/Project"));
const NewProject = lazy(() => import("../components/task/NewProject"));
const SingleProject = lazy(() => import("../components/task/SingleProject"));
const Nav = lazy(() => import("../components/Nav"));
const A2Z = lazy(() => import("../containers/tools/A2Z"));
const BookmarkCreate = lazy(() => import("../containers/BookmarkCreate"));
const Ndd = lazy(() => import("../components/Ndd"));
const User = lazy(() => import("../containers/users/User"));
const UserSetting = lazy(() => import("../containers/users/UserSetting"));
const Demo = lazy(() => import("../containers/Demo"));
const Calculator = lazy(() => import("../containers/demos/Calculator"));
const Parking = lazy(() => import("../containers/tools/Parking"));
const Font = lazy(() => import("../containers/demos/Font"));
const Like = lazy(() => import("../containers/Like"));
const Video = lazy(() => import("../containers/demos/Video"));
const Music = lazy(() => import("../containers/demos/Music"));
const Copywriting = lazy(() => import("../containers/tools/Copywriting"));
const Moon = lazy(() => import("../containers/demos/Moon"));
const PHPFunction = lazy(() => import("../containers/tools/PHPFunction"));
const Chat = lazy(() => import("../components/Chat"));
const Base64 = lazy(() => import("../containers/tools/Base64"));
const Money = lazy(() => import("../containers/tools/Money"));
const Color = lazy(() => import("../containers/tools/Color"));
const Docs = lazy(() => import("../containers/site/Docs"));
const MediaWikiToMarkdown = lazy(() => import("../containers/tools/MediaWikiToMarkdown"));
const Download = lazy(() => import("../containers/demos/Download"));
const NoMatch = lazy(() => import("../containers/NoMatch"));
const Diff = lazy(() => import("../containers/tools/Diff"));
const Game = lazy(() => import("../containers/game"));
const Pic = lazy(() => import("../containers/Pic"));
const Site = lazy(() => import("../containers/Site"));
const Test = lazy(() => import("../containers/post/Test"));
const MuiX = lazy(() => import("../containers/MuiX"));
const Thing = lazy(() => import("../projects/things/Thing"));
const ThingCreate = lazy(() => import("../projects/things/ThingCreate"));
const ThingPhoto = lazy(() => import("../projects/things/Photo"));
const ThingTag = lazy(() => import("../projects/things/Tag"));
const AddSuffix = lazy(() => import("../containers/tools/AddSuffix"));
const Ai = lazy(() => import("../containers/tools/Ai"));
// const Test = lazy(() => import("../containers/Test"));

export default () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* 注册、登陆和找回密码 */}
      <Route path="/login" element={<Login />} />
      <Route path="/redirect" element={<Redirect />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/reset/:secret" element={<Reset />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/forget/:secret" element={<EmailVerify />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/setting" element={<UserSetting />} />

        {/* 聊天室*/}
        <Route path="/chat" element={<Chat />} />

        <Route path="/sites" element={<Site />} />
        <Route path="/pics" element={<Pic />} />

        {/* Posts */}
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/:id/edit" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostSingle />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/tags" element={<Tags />} />

        {/* 待办事项 */}
        <Route path="/project" element={<Project />} />
        <Route path="/project/create" element={<NewProject />} />
        <Route path="/project/:id" element={<SingleProject />} />

        {/* Demos */}
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/weibo" element={<Weibo />} />
        <Route path="/weibo/about" element={<WeiboAbout />} />
        <Route path="/emoji" element={<Emoji />} />
        <Route path="/emoji/create" element={<EmojiCreate />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/bookmark/create" element={<BookmarkCreate />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demos/calculator" element={<Calculator />} />
        <Route path="/demos/parking" element={<Parking />} />
        <Route path="/demos/font" element={<Font />} />
        <Route path="/download" element={<Download />} />
        <Route path="/moon" element={<Moon />} />

        {/* 小工具 */}
        <Route path="/diff" element={<Diff />} />
        <Route path="/a-z" element={<A2Z />} />
        <Route path="/ndd" element={<Ndd />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/money" element={<Money />} />
        <Route path="/color" element={<Color />} />
        <Route path="/mediawiki-to-markdown" element={<MediaWikiToMarkdown />} />
        <Route path="/copywriting" element={<Copywriting />} />
        <Route path="/php-function" element={<PHPFunction />} />
        <Route path="/add-suffix" element={<AddSuffix />} />

        {/* API */}
        <Route path="/api" element={<Api />} />
        <Route path="/api/time" element={<Time />} />

        {/* Example 示例 */}
        <Route path="/video" element={<Video />} />
        <Route path="/music" element={<Music />} />

        {/* 关于我 */}
        <Route path="/about" element={<About />} />
        <Route path="/self-talk" element={<SelfTalk />} />
        <Route path="/like" element={<Like />} />
        <Route path="/powered_by" element={<PoweredBy />} />
        <Route path="/like" element={<Like />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/docs" element={<Docs />} />

        <Route path="/things" element={<Thing />} />
        <Route path="/things/create" element={<ThingCreate />} />
        <Route path="/things/tags" element={<ThingTag />} />
        <Route path="/things/photos" element={<ThingPhoto />} />

        {/* 开发中、测试 */}
        <Route path="/test" element={<Test />} />
        <Route path="/mui-x" element={<MuiX />} />
        <Route path="/game" element={<Game />} />
        <Route path="/ai" element={<Ai />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </Suspense>
);

import * as React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../components/display/Loading";
import Redirect from "../containers/users/Redirect";
import Layout from "./Layout";

const lazyLoad = (path: string) => lazy(() => import(`${path}`));

const PostList = lazyLoad("../containers/post/PostList");
const Login = lazyLoad("../containers/users/Login");
const SelfTalk = lazyLoad("../containers/myself/SelfTalk");
const Emoji = lazyLoad("../components/emoji/Emoji");
const EmojiCreate = lazyLoad("../components/emoji/EmojiCreate");
const PostCreate = lazyLoad("../containers/post/PostCreate");
const PostSingle = lazyLoad("../containers/post/PostSingle");
const Cars = lazyLoad("../containers/myself/Cars");
const Reset = lazyLoad("../containers/users/Reset");
const AllCategories = lazyLoad("../containers/post/AllCategories");
const Tags = lazyLoad("../containers/Tags");
const Register = lazyLoad("../containers/users/Register");
const Forget = lazyLoad("../containers/auth/Forget");
const EmailVerify = lazyLoad("../containers/auth/EmailVerify");
const Api = lazyLoad("../containers/tools/Api");
const Time = lazyLoad("../containers/tools/Time");
const About = lazyLoad("../containers/myself/About");
const Weibo = lazyLoad("../containers/demos/Weibo");
const WeiboAbout = lazyLoad("../containers/demos/WeiboAbout");
const Project = lazyLoad("../components/task/Project");
const NewProject = lazyLoad("../components/task/NewProject");
const SingleProject = lazyLoad("../components/task/SingleProject");
const Nav = lazyLoad("../containers/nav");
const BookmarkCreate = lazyLoad("../containers/BookmarkCreate");
const Search = lazyLoad("../components/GoogleSearch");
const User = lazyLoad("../containers/users/User");
const UserSetting = lazyLoad("../containers/users/UserSetting");
const Demo = lazyLoad("../containers/Demo");
const Calculator = lazyLoad("../containers/demos/Calculator");
const Parking = lazyLoad("../containers/tools/Parking");
const Font = lazyLoad("../containers/demos/Font");
const Like = lazyLoad("../containers/myself/Like");
const Video = lazyLoad("../containers/demos/Video");
const Music = lazyLoad("../containers/demos/Music");
const Moon = lazyLoad("../containers/demos/Moon");
const Chat = lazyLoad("../components/Chat");
const Base64 = lazyLoad("../containers/tools/Base64");
const Money = lazyLoad("../containers/tools/Money");
const MediaWikiToMarkdown = lazyLoad("../containers/tools/MediaWikiToMarkdown");
const Download = lazyLoad("../containers/demos/Download");
const NoMatch = lazyLoad("../containers/NoMatch");
const Diff = lazyLoad("../containers/tools/Diff");
const Game = lazyLoad("../containers/game");
const Site = lazyLoad("../containers/Site");
const MuiX = lazyLoad("../containers/MuiX");
const Thing = lazyLoad("../projects/things/Thing");
const ThingCreate = lazyLoad("../projects/things/ThingCreate");
const ThingPhoto = lazyLoad("../projects/things/Photo");
const ThingTag = lazyLoad("../projects/things/Tag");
const AddSuffix = lazyLoad("../containers/tools/AddSuffix");
const Ai = lazyLoad("../containers/tools/Ai");
const Test = lazyLoad("../containers/Test");

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
        <Route path="/ai" element={<Ai />} />

        <Route path="/sites" element={<Site />} />

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
        <Route path="/search" element={<Search />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/money" element={<Money />} />
        <Route path="/mediawiki-to-markdown" element={<MediaWikiToMarkdown />} />
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
        <Route path="/cars" element={<Cars />} />

        {/* 物品管理 */}
        <Route path="/things" element={<Thing />} />
        <Route path="/things/create" element={<ThingCreate />} />
        <Route path="/things/tags" element={<ThingTag />} />
        <Route path="/things/photos" element={<ThingPhoto />} />

        {/* 开发中、测试 */}
        <Route path="/test" element={<Test />} />
        <Route path="/mui-x" element={<MuiX />} />
        <Route path="/game" element={<Game />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </Suspense>
);

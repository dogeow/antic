import * as React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../components/Loading";
import Layout from "./Layout";

const PostList = lazy(() => import("containers/post/PostList"));
const Login = lazy(() => import("containers/users/Login"));
const Redirect = lazy(() => import("containers/users/Redirect"));
const SelfTalk = lazy(() => import("containers/me/SelfTalk"));
const PoweredBy = lazy(() => import("containers/site/PoweredBy"));
const EmojiCreate = lazy(() => import("components/Emoji/EmojiCreate"));
const Emoji = lazy(() => import("components/Emoji"));
const PostCreate = lazy(() => import("components/post/PostCreate"));
const PostSingle = lazy(() => import("components/post/PostSingle"));
const Cars = lazy(() => import("containers/me/Cars"));
const Reset = lazy(() => import("containers/users/Reset"));
const Bookmarks = lazy(() => import("containers/Bookmarks"));
const Progress = lazy(() => import("containers/Progress"));
const AllCategories = lazy(() => import("containers/post/AllCategories"));
const Tags = lazy(() => import("containers/Tags"));
const Register = lazy(() => import("containers/users/Register"));
const Forget = lazy(() => import("containers/auth/Forget"));
const EmailVerify = lazy(() => import("containers/auth/EmailVerify"));
const Api = lazy(() => import("containers/tools/Api"));
const Time = lazy(() => import("containers/tools/Time"));
const About = lazy(() => import("containers/site/About"));
const Weibo = lazy(() => import("containers/Weibo"));
const WeiboAbout = lazy(() => import("containers/WeiboAbout"));
const Project = lazy(() => import("components/Task/Project"));
const NewProject = lazy(() => import("components/Task/NewProject"));
const SingleProject = lazy(() => import("components/Task/SingleProject"));
const Nav = lazy(() => import("components/Nav"));
const A2Z = lazy(() => import("containers/tools/A2Z"));
const Piano = lazy(() => import("components/Piano"));
const BookmarkCreate = lazy(() => import("containers/BookmarkCreate"));
const Ndd = lazy(() => import("components/Ndd"));
const User = lazy(() => import("containers/users/User"));
const UserSetting = lazy(() => import("containers/users/UserSetting"));
const Demo = lazy(() => import("containers/Demo"));
const Calculator = lazy(() => import("demo/Calculator"));
const Parking = lazy(() => import("containers/tools/Parking"));
const Font = lazy(() => import("demo/Font"));
const Like = lazy(() => import("components/Like"));
const Video = lazy(() => import("containers/demos/Video"));
const Music = lazy(() => import("containers/demos/Music"));
const Copywriting = lazy(() => import("containers/tools/Copywriting"));
const Moon = lazy(() => import("containers/Moon"));
const PHPFunction = lazy(() => import("containers/PHPFunction"));
const Chat = lazy(() => import("containers/Chat"));
const Base64 = lazy(() => import("containers/tools/Base64"));
const Money = lazy(() => import("containers/tools/Money"));
const Color = lazy(() => import("containers/tools/Color"));
const Goods = lazy(() => import("containers/goods"));
const Docs = lazy(() => import("containers/site/Docs"));
const Roads = lazy(() => import("containers/Roads"));
const MediaWikiToMarkdown = lazy(() =>
  import("containers/MediaWikiToMarkdown")
);
const markdown = lazy(() => import("containers/markdown"));
const Test = lazy(() => import("containers/Test"));
const NoMatch = lazy(() => import("containers/NoMatch"));
const Diff = lazy(() => import("containers/Diff"));
const Data = lazy(() => import("containers/Data"));

export default () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/redirect" element={<Redirect />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        {["/popup.html", "/index.html"].map((path, index) => (
          <Route path={path} element={<PostList />} key={index} />
        ))}
        <Route path="/data" element={<Data />} />
        <Route path="/diff" element={<Diff />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/:id/edit" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostSingle />} />
        <Route path="/reset/:secret" element={<Reset />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/forget/:secret" element={<EmailVerify />} />
        <Route path="/api" element={<Api />} />
        <Route path="/api/time" element={<Time />} />
        <Route path="/about" element={<About />} />
        <Route path="/weibo" element={<Weibo />} />
        <Route path="/weibo/about" element={<WeiboAbout />} />
        <Route path="/emoji" element={<Emoji />} />
        <Route path="/emoji/create" element={<EmojiCreate />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/create" element={<NewProject />} />
        <Route path="/project/:id" element={<SingleProject />} />
        <Route path="/self-talk" element={<SelfTalk />} />
        <Route path="/like" element={<Like />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/a-z" element={<A2Z />} />
        <Route path="/piano" element={<Piano />} />
        <Route path="/bookmark/create" element={<BookmarkCreate />} />
        <Route path="/bookmarks/old" element={<Bookmarks />} />
        <Route path="/ndd" element={<Ndd />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/setting" element={<UserSetting />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demos/calculator" element={<Calculator />} />
        <Route path="/demos/parking" element={<Parking />} />
        <Route path="/demos/font" element={<Font />} />
        <Route path="/powered_by" element={<PoweredBy />} />
        <Route path="/like" element={<Like />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/video" element={<Video />} />
        <Route path="/music" element={<Music />} />
        <Route path="/copywriting" element={<Copywriting />} />
        <Route path="/moon" element={<Moon />} />
        <Route path="/php-function" element={<PHPFunction />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/money" element={<Money />} />
        <Route path="/color" element={<Color />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/roads" element={<Roads />} />
        <Route
          path="/mediawiki-to-markdown"
          element={<MediaWikiToMarkdown />}
        />
        <Route path="/markdown" element={<markdown />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </Suspense>
);

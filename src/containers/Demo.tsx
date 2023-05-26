import * as React from "react";
import { Link } from "react-router-dom";

interface LinkItem {
  to: string;
  label: string;
  emoji?: string;
  isAnchor?: boolean;
}

interface LinkSectionProps {
  title: string;
  links: LinkItem[];
}

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => (
  <div>
    <h3>{title}</h3>
    <ul>
      {links.map(({ to, label, emoji, isAnchor }) =>
        isAnchor ? (
          <li key={label}>
            <a href={to} target="_blank" rel="noopener noreferrer">
              {emoji && <span role="img">{emoji}</span>}
              {label}
            </a>
          </li>
        ) : (
          <li key={label}>
            <Link to={to}>
              {emoji && <span role="img">{emoji}</span>}
              {label}
            </Link>
          </li>
        )
      )}
    </ul>
  </div>
);

const Demo = () => (
  <div>
    <LinkSection
      title="小项目"
      links={[
        {
          to: "/things",
          label: "物品管理",
        },
      ]}
    />
    <LinkSection
      title="小工具"
      links={[
        {
          to: "/diff",
          label: "文本对比",
        },
        {
          to: "/mediawiki-to-markdown",
          label: "MediaWiki 转 Markdown",
        },
        {
          to: "/base64",
          label: "Base64",
        },
        {
          to: "/music",
          label: "音乐播放器",
        },
        {
          to: "/moon",
          emoji: "🥮",
          label: "博饼",
        },
        {
          to: "/money",
          label: "记账",
        },
        {
          to: "/demos/jqueryselectors",
          label: "jQuery 选择器在线测试",
          isAnchor: true,
        },
        {
          to: "/demos/calculator",
          emoji: "🌡",
          label: "摄氏度、华氏度转换（React 官方 Example）",
        },
        {
          to: "/api/time",
          emoji: "⌚",
          label: "️时间、时间戳",
        },
        {
          to: "/nav",
          emoji: "🧭",
          label: "网址导航",
        },
      ]}
    />
    <LinkSection
      title="学习"
      links={[
        {
          to: "/codes/react-test.html",
          label: "React 单文件测试",
          isAnchor: true,
        },
        {
          to: "/demos/tailwind",
          label: "Tailwind CSS 学习",
          isAnchor: true,
        },
        {
          to: "/demos/font",
          label: "Typography 字体展示",
          isAnchor: true,
        },
      ]}
    />
    <LinkSection
      title="Canvas"
      links={[
        {
          to: "/demos/canvas/threejs_load_images.html",
          label: "Three.js 加载图片",
          isAnchor: true,
        },
        {
          to: "/demos/canvas/3d.html",
          label: "Emoji 3D(Three.js)",
          isAnchor: true,
        },
        {
          to: "/demos/canvas/like.html",
          label: "喜欢的（Three.js）",
          isAnchor: true,
        },
        {
          to: "/demos/canvas/cherry.html",
          label: "樱花",
          emoji: "🌸",
          isAnchor: true,
        },
      ]}
    />
    <LinkSection
      title="音视频"
      links={[
        {
          to: "/music",
          label: "音频测试",
        },
        {
          to: "/examples/mv.html",
          label: "MV 测试",
        },
      ]}
    />
    <LinkSection
      title="自用工具（弃用）"
      links={[
        {
          to: "/demos/parking",
          label: "停车（爬虫)",
        },
        {
          to: "/weibo",
          label: "微博热搜榜",
        },
      ]}
    />
  </div>
);

export default Demo;

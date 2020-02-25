import React from 'react'
import { Link } from 'react-router-dom'

const Demo = () => {
  return (
    <>
      <ul>
        <li><a href="/demos/threejs/3d" target="_blank">Emoji 3D(Three.js)</a></li>
        <li><a href="/demos/threejs/love" target="_blank">喜欢的（Three.js）</a></li>
        <li><a href="/demos/threejs/threejs_load_images" target="_blank">Three.js 加载图片</a></li>
        <li><a href="/demos/mv.html" target="_blank">MV 测试</a></li>
        <li><a href="/demos/react-test" target="_blank">React 单文件测试</a></li>
        {/*<li><a href="/demos/tailwind" target="_blank">Tailwind CSS 学习</a></li>*/}
        <li><Link to="/demos/clock">Time</Link></li>
        <li><Link to="/demos/calculator">🌡摄氏度、华氏度转换（React 官方 Example）</Link></li>
        <li><Link to="/demos/parking">停车（爬虫)</Link></li>
      </ul>
    </>
  );
};

export default Demo

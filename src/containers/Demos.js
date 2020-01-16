import React from 'react'

const Demos = () => {
  return (
    <>
      <ul>
        <li><a href="/demos/threejs/3d.html" target="_blank">Emoji 3D(Three.js)</a></li>
        <li><a href="/demos/threejs/love.html" target="_blank">喜欢的（Three.js）</a></li>
        <li><a href="/demos/threejs/threejs_load_images.html" target="_blank">Three.js 加载图片</a></li>
        <li><a href="/demos/mv.html" target="_blank">MV 测试</a></li>
        <li><a href="/demos/react-test.html" target="_blank">React 单文件测试</a></li>
        {/*<li><a href="/demos/tailwind" target="_blank">Tailwind CSS 学习</a></li>*/}
        <li><a href="/demos/clock">Time</a></li>
        <li><a href="/demos/calculator">🌡摄氏度、华氏度转换（React 官方 Example）</a></li>
      </ul>
    </>
  );
};

export default Demos

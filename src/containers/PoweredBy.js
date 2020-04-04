import React from 'react';

const PoweredBy = () => {
  return (
    <div>
      <div>
        <h2>总体</h2>
        <ul>
          <li>后端：Laravel</li>
          <li>前端：React</li>
          <li>UI：Material-UI</li>
          <li>鼠标样式：守望先锋</li>
        </ul>
      </div>
      <div>
        <h2>详细</h2>
        <ul>
          <li>react-markdown-editor-lite</li>
          <li>markdown-it</li>
          <li>SweetAlert 2</li>
          <li>socket.io</li>
          <li>moment</li>
          <li>clipboard</li>
          <li>axios</li>
          <li>lodash</li>
          <li>redux</li>
          <li>react-router-dom</li>
          <li>Algolia Search</li>
          <li>OSS / 又拍云</li>
          <li>Slack</li>
          <li>JWT</li>
        </ul>
      </div>
      <div>
        <h2>服务器</h2>
        <ul>
          <li>Ubuntu 18.04 LTS</li>
          <li>PHP 7.2</li>
          <li>Nginx 1.14</li>
          <li>MySQL 5.7</li>
        </ul>
      </div>
      <div>
        <p>
          <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2F233.sx%2F"
             target={'_blank'}>
            <img style={{border: 0, width: 88, height: 31}}
                 src="https://www.w3.org/Icons/valid-xhtml20.gif"
                 alt="Valid HTML!"/>
          </a>
          <a
            href="http://jigsaw.w3.org/css-validator/validator?uri=233.sx&profile=css3svg&usermedium=all&warning=1&vextwarning="
            target={'_blank'}>
            <img style={{border: 0, width: 88, height: 31}}
                 src="http://jigsaw.w3.org/css-validator/images/vcss"
                 alt="Valid CSS!"/>
          </a>
        </p>
      </div>
    </div>
  );
};

export default PoweredBy;

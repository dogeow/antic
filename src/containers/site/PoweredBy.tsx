import * as React from "react";

export default function PowerBy() {
  return (
    <div style={{ flexFlow: "column" }}>
      <div>
        <h2>整体</h2>
        <ul>
          <li>前后端分离，使用 JWT</li>
          <li>
            <a href="https://zh-hans.reactjs.org/" target="_blank" rel="noopener noreferrer">
              React
            </a>
          </li>
          <li>
            <a href="https://material-ui.com/zh/" target="_blank" rel="noopener noreferrer">
              Material UI 风格
            </a>
          </li>
          <li>
            <a href=" https://laravel.com" target="_blank" rel="noopener noreferrer">
              Laravel
            </a>
          </li>
          <li>GraphQL</li>
          <li>WebSocket</li>
        </ul>
      </div>
      <h2>服务器：LNMP + Redis + ES</h2>
      <div>
        <h2>第三方</h2>
        <ul>
          <li>OSS、短信</li>
          <li>Slack Notification</li>
          <li>Sentry</li>
          <li>Gravatar</li>
        </ul>
      </div>
      <div>
        <h2>其他</h2>
        <ul>
          <li>Overwatch Pointer</li>
        </ul>
      </div>
    </div>
  );
}

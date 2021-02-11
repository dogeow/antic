import * as React from "react";

const Music = () => (
  <div>
    <audio
      id="music"
      src={`${process.env.REACT_APP_CDN_URL}/music/和楽器バンド - 東風破.mp3`}
      controls="controls"
      preload="auto"
      controlsList="nodownload"
    >
      你的浏览器不支持audio标签
    </audio>
    <div>
      <button
        type="button"
        onClick={() => document.getElementById("music").play()}
      >
        播放声音
      </button>
      <button
        type="button"
        onClick={() => document.getElementById("music").pause()}
      >
        暂停声音
      </button>
      <button
        type="button"
        onClick={() => {
          document.getElementById("music").volume += 0.1;
        }}
      >
        提高音量
      </button>
      <button
        type="button"
        onClick={() => {
          document.getElementById("music").volume -= 0.1;
        }}
      >
        降低音量
      </button>
    </div>
  </div>
);

export default Music;

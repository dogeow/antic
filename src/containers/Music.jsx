import React, { useCallback, useEffect, useRef, useState } from "react";

const musics = ["大声说爱我 - 刘依纯.mp3", "和楽器バンド - 東風破.mp3"];

const Music = () => {
  const [no, setNo] = useState(0);

  const audio = useRef(null);

  const musicEnd = () => {
    if (no === musics.length) {
      setNo(0);
    } else {
      setNo(no + 1);
      audio.current.autoplay = 1;
    }
  };

  useEffect(() => {
    audio.current.addEventListener("ended", () => musicEnd(), false);

    return audio.current.removeEventListener("ended", () => musicEnd(), false);
  });

  return (
    <div>
      <div>
        {musics.map((music, index) => {
          return (
            <div key={index}>{music === musics[no] ? "➡️" + music : music}</div>
          );
        })}
      </div>
      <audio
        id="music"
        ref={audio}
        src={`${process.env.REACT_APP_CDN_URL}/music/${musics[no]}`}
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
};

export default Music;

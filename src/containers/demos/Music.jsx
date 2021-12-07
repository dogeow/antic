import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useRef, useState } from "react";

const musics = ["大声说爱我 - 刘依纯.mp3", "和楽器バンド - 東風破.mp3"];

const Music = () => {
  const [no, setNo] = useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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

  const playMusic = (index) => {
    setNo(index);
    audio.current.autoplay = 1;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List component="nav" dense="true" aria-label="main mailbox folders">
          {musics.map((music, index) => {
            return (
              <ListItem
                button
                key={index}
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  playMusic(index);
                }}
              >
                <ListItemText primary={music} />
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
        <button type="button" onClick={() => audio.current.play()}>
          播放声音
        </button>
        <button type="button" onClick={() => audio.current.pause()}>
          暂停声音
        </button>
        <button
          type="button"
          onClick={() => {
            audio.current.volume += 0.1;
          }}
        >
          提高音量
        </button>
        <button
          type="button"
          onClick={() => {
            audio.current.volume -= 0.1;
          }}
        >
          降低音量
        </button>
      </Grid>
    </Grid>
  );
};

export default Music;

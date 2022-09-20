import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useRef, useState } from "react";

import { CDN_URL } from "../../config/services";
const musics = ["大声说爱我 - 刘依纯.mp3", "和楽器バンド - 東風破.mp3"];

const Music = () => {
  const [no, setNo] = useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const audio = useRef<HTMLAudioElement>(null);

  const handleListItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const musicEnd = () => {
      if (no === musics.length) {
        setNo(0);
      } else {
        setNo(no + 1);
        audio.current.autoplay = true;
      }
    };

    audio.current.addEventListener("ended", () => musicEnd(), false);

    return audio.current.removeEventListener("ended", () => musicEnd(), false);
  }, [audio, no]);

  const playMusic = (index: number) => {
    setNo(index);
    audio.current.autoplay = true;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List component="nav" dense={true} aria-label="main mailbox folders">
          {musics.map((music, index) => {
            return (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  playMusic(index);
                }}
              >
                <ListItemText primary={music} />
              </ListItemButton>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={12}>
        <audio
          id="music"
          ref={audio}
          src={`${CDN_URL}/music/${musics[no]}`}
          controls={true}
          preload="auto"
          controlsList="nodownload"
        >
          你的浏览器不支持audio标签
        </audio>
      </Grid>
      <Grid item xs={12} spacing={1}>
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

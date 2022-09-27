import styled from "@emotion/styled";
import { Button, Grid, GridProps, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { musics } from "../../config/index.json";
import { CDN_URL } from "../../config/services";

const GridCenter = styled(Grid)<GridProps>(() => ({
  textAlign: "center",
}));

const Music = () => {
  const [no, setNo] = useState(0);

  const audio = useRef<HTMLAudioElement>(new Audio());

  const handleListItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setNo(index);
  };

  useEffect(() => {
    const { current } = audio;
    if (current === null) {
      return;
    }

    const musicEnd = () => {
      setNo(no + 1 === musics.length ? 0 : no + 1);
      current.autoplay = true;
    };

    current.addEventListener("ended", () => musicEnd());

    return current.removeEventListener("ended", () => musicEnd());
  }, [audio, no]);

  const playMusic = (index: number) => {
    setNo(index);
    audio.current.autoplay = true;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <audio
          id="music"
          ref={audio}
          src={`${CDN_URL}/music/${musics[no]}`}
          controls={true}
          preload="auto"
          controlsList="nodownload"
          style={{ width: "100%" }}
        >
          你的浏览器不支持audio标签
        </audio>
      </Grid>
      <Grid item container spacing={1} justifyContent="space-around" justifyItems="center" alignItems="center">
        <GridCenter item xs={6} md={3}>
          <Button variant="outlined" onClick={() => audio.current.play()}>
            播放声音
          </Button>
        </GridCenter>
        <GridCenter item xs={6} md={3}>
          <Button variant="outlined" onClick={() => audio.current.pause()}>
            暂停声音
          </Button>
        </GridCenter>
        <GridCenter item xs={6} md={3}>
          <Button
            variant="outlined"
            onClick={() => {
              audio.current.volume += 0.1;
            }}
          >
            提高音量
          </Button>
        </GridCenter>
        <GridCenter item xs={6} md={3}>
          <Button
            variant="outlined"
            onClick={() => {
              audio.current.volume -= 0.1;
            }}
          >
            降低音量
          </Button>
        </GridCenter>
      </Grid>
      <Grid item xs={12}>
        <h2>播放列表</h2>
        <List component="nav" dense={true} aria-label="main mailbox folders">
          {musics.map((music, index) => (
            <ListItemButton
              key={index}
              selected={no === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                playMusic(index);
              }}
            >
              <ListItemText primary={`${index + 1} ${music}`} />
            </ListItemButton>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Music;

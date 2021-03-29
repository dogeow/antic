import "video.js/dist/video-js.min.css";

import * as React from "react";

import VideoJs from "../components/Video";

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  controls: true,
  sources: [
    {
      src: "https://upyun.dogeow.com/medias/mv.mp4",
      type: "video/mp4",
    },
  ],
};

export default function Video() {
  return (
    <div>
      <VideoJs {...videoJsOptions} />
    </div>
  );
}

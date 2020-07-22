import React from "react";
import VideoJs from "../components/video";
import "video.js/dist/video-js.min.css";

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  width: 720,
  height: 300,
  controls: true,
  sources: [
    {
      src: "https://cdn.gugelong.com/medias/mv.mp4",
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

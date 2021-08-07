import "video.js/dist/video-js.min.css";

import VideoJs from "components/Video";
import * as React from "react";

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  controls: true,
  sources: [
    {
      src: `${process.env.REACT_APP_CDN_URL}medias/mv.mp4`,
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

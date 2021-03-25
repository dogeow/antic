import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import dayjs from "dayjs";
import React from "react";

export default function ({ content, time }) {
  return (
    <Tooltip
      title={dayjs(time).format("YYYY-MM-DD HH:mm:ss")}
      arrow
      disableFocusListener
      disableTouchListener
      enterDelay={200}
      interactive={true}
      placement="top"
      TransitionComponent={Zoom}
    >
      <div style={{ color: "gray" }}>
        {content}
        <time>{dayjs(time).fromNow()}</time>
      </div>
    </Tooltip>
  );
}

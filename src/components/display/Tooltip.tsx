import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import dayjs from "dayjs";
import * as React from "react";

export default function ({ content, time }: { content: string; time: string }) {
  return (
    <Tooltip
      title={dayjs(time).format("YYYY-MM-DD HH:mm:ss")}
      arrow
      disableFocusListener
      disableTouchListener
      enterDelay={200}
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

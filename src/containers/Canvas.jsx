import * as React from "react";

import useCanvas from "./useCanvas";

function resizeCanvasToDisplaySize(canvas) {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;

    return true;
  }

  return false;
}

const _predraw = (context, canvas) => {
  context.save();
  resizeCanvasToDisplaySize(context, canvas);
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
};

const _postdraw = () => {
  index++;
  ctx.restore();
};

const Canvas = (props) => {
  const { draw, predraw = _predraw, postdraw = _postdraw, ...rest } = props;
  const canvasRef = useCanvas(draw, { predraw, postdraw });

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;

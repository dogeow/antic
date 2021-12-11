import useCanvas from "hooks/useCanvas";
import React from "react";

export default () => {
  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 50, 50);
  };

  const canvasRef = useCanvas(draw);

  return <canvas id="canvas" ref={canvasRef} />;
};

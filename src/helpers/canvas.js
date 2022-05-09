export function getPointOnCanvas(canvas, x, y) {
  const bbox = canvas.getBoundingClientRect();

  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}

export function isCanvasSupported() {
  const elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext("2d"));
}
/**
 *  获取在 Canvas 上某一点的坐标
 *  @param {HTMLCanvasElement} canvas - 画布元素
 *  @param {number} x - 点的横坐标
 *  @param {number} y - 点的纵坐标
 *  @return {Point} 返回包含转换后坐标的 Point 对象
 */
export function getPointOnCanvas(canvas: HTMLCanvasElement, x: number, y: number): Point {
  const bbox = canvas.getBoundingClientRect();

  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
}

/**
 *  判断当前浏览器是否支持 Canvas
 *  @return {boolean} 如果支持则返回 true，否则返回 false
 */
export function isCanvasSupported() {
  const elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext("2d"));
}

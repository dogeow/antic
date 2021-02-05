/**
 * 随机整数
 * @param {int} max 最大值
 * @param {int} min 最小值
 * @return {int} 随机整数
 */
export function randomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 生成随机整数

 @param {number} min - 最小值
 @param {number} max - 最大值
 @return {number} - 随机整数
 */
export function generateRandomInt(min: number, max: number): number {
  if (max < min) {
    throw new Error("max不能小于min！");
  }

  const range = max - min;
  return Math.floor(Math.random() * (range + 1)) + min;
}

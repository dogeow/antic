import { LAYERS, MAP_DIMENSIONS, SOLID_TILES } from "./constants";

export const isSolidTile = (x: number, y: number) => {
  for (const layer of LAYERS) {
    if (SOLID_TILES.includes(layer[y][x])) {
      return true;
    }
  }
  return false;
};

export const isMapEdge = (x: number, y: number) => {
  const { ROWS, COLS } = MAP_DIMENSIONS;
  return x < 0 || x >= COLS || y < 0 || y >= ROWS;
};

export const checkMapCollision = (x: number, y: number) => {
  return isMapEdge(x, y) || isSolidTile(x, y);
};

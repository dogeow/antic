import { MAP_DIMENSIONS, TILE_SIZE } from "./constants";
const { COLS, ROWS } = MAP_DIMENSIONS;

export default (ctx, grid) => {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const item = grid[i][j];
      if (!item) {
        // empty tile
        continue;
      }
      const img = document.querySelector(`#map-tile-img-${item}`);
      const x = j * TILE_SIZE;
      const y = i * TILE_SIZE;
      ctx.drawImage(
        img,
        0,
        0,
        TILE_SIZE,
        TILE_SIZE,
        x,
        y,
        TILE_SIZE,
        TILE_SIZE
      );
    }
  }
};

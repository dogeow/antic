import { TILE_SIZE } from "./constants";

export default (ctx, monsters) => {
  for (const monster of monsters) {
    const x = monster.x * TILE_SIZE;
    const y = monster.y * TILE_SIZE;

    ctx.drawImage(
      document.querySelector("#monster"),
      0,
      0,
      32,
      32,
      x,
      y,
      32,
      32
    );
  }
};

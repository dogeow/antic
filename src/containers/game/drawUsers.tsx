import { TILE_SIZE } from "./constants";

export default (ctx, users) => {
  for (const user of users) {
    const x = user.x * TILE_SIZE;
    const y = user.y * TILE_SIZE;

    ctx.drawImage(document.querySelector("#character"), 0, 0, 32 - 5, 32, x, y, 32, 32);
    ctx.font = "12px JetBrains Mono, monospace";
    ctx.fillText(user.name, x, y - 4);
  }
};

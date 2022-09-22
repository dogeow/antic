import produce from "immer";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { getItem } from "../../helpers";
import { getPointOnCanvas, isCanvasSupported } from "../../helpers/canvas";
import useCanvas from "../../hooks/useCanvas";
import axios from "../../instance/axios";
import { userState } from "../../states";
import { LAYERS, MAP_TILE_IMAGES, TILE_SIZE } from "./constants";
import drawLayer from "./drawLayer";
import drawMonster from "./drawMonster";
import drawUsers from "./drawUsers";
import { checkMapCollision } from "./utils";

export default () => {
  const [users, setUsers] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [user] = useRecoilState(userState);

  if (!isCanvasSupported()) {
    return <div>不支持 Canvas</div>;
  }

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawLayer(ctx, LAYERS[0]);
    drawLayer(ctx, LAYERS[1]);

    drawMonster(ctx, monsters);
    drawUsers(ctx, users);
  };

  const canvasRef = useCanvas(draw);

  const game = useCallback((e) => {
    const canvas = e.target;
    let { x, y } = getPointOnCanvas(canvas, e.pageX, e.pageY);
    x = Math.floor(x / TILE_SIZE);
    y = Math.floor(y / TILE_SIZE);

    if (checkMapCollision(x, y)) {
      return;
    }

    setUsers(
      produce((draft) => {
        const userId = parseInt(getItem("user.id"));
        const user = draft.find((user) => user.id === userId);
        if (user) {
          user.x = x;
          user.y = y;
        } else {
          draft.push({
            id: userId,
            name: localStorage.userName,
            x,
            y,
          });
        }
      })
    );

    axios.post(
      "/game",
      { x, y },
      {
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
      }
    );
  }, []);

  useEffect(() => {
    axios.get("game").then(({ data }) => {
      setMonsters(data.monsters);
    });
  }, []);

  // WebSocket
  useEffect(() => {
    window.Echo.join("game")
      .here((users) => {
        setUsers(users);
      })
      .joining((user) => {})
      .leaving((user) => {});

    window.Echo.private("game").listen(".game", (e) => {
      if (e.data.x && e.data.y) {
        setUsers(
          produce((draft) => {
            const user = draft.find((user) => user.id === e.data.id);
            if (user) {
              user.x = e.data.x;
              user.y = e.data.y;
            } else {
              draft.push(e.data);
            }
          })
        );
      } else {
        setMonsters(
          produce((draft) => {
            const monster = draft.find((monster) => monster.id === e.data.monster);
            if (monster) {
              monster.x = e.data.monster.x;
              monster.y = e.data.monster.y;
            } else {
              draft.push(e.data.monster);
            }
          })
        );
      }
    });

    return () => {
      window.Echo.private("game").stopListening(".game");
      window.Echo.leave("game");
    };
  }, [user.token]);

  // 点击事件
  useEffect(() => {
    // 监听事件
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.addEventListener("mousedown", game);

    return () => canvas.removeEventListener("mousedown", game);
  }, []);

  return (
    <>
      <div className="images-buffer" style={{ display: "none" }}>
        {Object.keys(MAP_TILE_IMAGES).map((key) => (
          <img
            key={`map-tile-img-${key}`}
            id={`map-tile-img-${key}`}
            src={`${MAP_TILE_IMAGES[key]}`}
            alt={`map-tile-${key}`}
          />
        ))}
        <img id="character" alt="character" className="images-buffer" src="assets/heroes/heroes.png" />
        <img id="monster" alt="monster" className="images-buffer" src="assets/monsters/monster.png" />
      </div>
      <canvas id="canvas" ref={canvasRef} width="800px" height="800px" />
    </>
  );
};

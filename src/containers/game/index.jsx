import { getPointOnCanvas, isCanvasSupported } from "helpers/canvas";
import useCanvas from "hooks/useCanvas";
import produce from "immer";
import axios from "instance/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  LAYERS,
  MAP_DIMENSIONS,
  MAP_TILE_IMAGES,
  TILE_SIZE,
} from "./constants";
import { checkMapCollision } from "./utils";

export default () => {
  const [users, setUsers] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const token = useSelector((state) => state.lab.token);
  const { COLS, ROWS } = MAP_DIMENSIONS;

  if (!isCanvasSupported()) {
    return <div>不支持 Canvas</div>;
  }

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
        const userId = parseInt(localStorage.userId);
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
    window.Echo.options.auth.headers.Authorization = token;

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
            const monster = draft.find(
              (monster) => monster.id === e.data.monster
            );
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
  }, [token]);

  // 点击事件
  useEffect(() => {
    // 监听事件
    document.addEventListener("mousedown", game);

    return () => document.removeEventListener("mousedown", game);
  }, [game]);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const drawLayer = (grid) => {
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

    drawLayer(LAYERS[0]);
    drawLayer(LAYERS[1]);

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

    for (const user of users) {
      const x = user.x * TILE_SIZE;
      const y = user.y * TILE_SIZE;

      ctx.drawImage(
        document.querySelector("#character"),
        0,
        0,
        32 - 5,
        32,
        x,
        y,
        32,
        32
      );
      ctx.font = "12px JetBrains Mono, monospace";
      ctx.fillText(user.name, x, y - 4);
    }
  };

  const canvasRef = useCanvas(draw);

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
        <img
          id="character"
          alt="character"
          className="images-buffer"
          src="assets/heroes/heroes.png"
        />
        <img
          id="monster"
          alt="monster"
          className="images-buffer"
          src="assets/monsters/monster.png"
        />
      </div>
      <canvas id="canvas" ref={canvasRef} width="800px" height="800px" />
    </>
  );
};

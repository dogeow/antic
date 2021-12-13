import {
  canvasSupport,
  getPointOnCanvas,
  isCanvasSupported,
} from "helpers/canvas";
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

export default () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.lab.token);
  const { COLS, ROWS } = MAP_DIMENSIONS;

  if (!isCanvasSupported()) {
    return <div>不支持 Canvas</div>;
  }

  const game = useCallback((e) => {
    const x = e.pageX;
    const y = e.pageY;
    const canvas = e.target;
    const loc = getPointOnCanvas(canvas, x, y);

    setUsers(
      produce((draft) => {
        const user = draft.find((user) => user.id === localStorage.userId);
        if (user) {
          user.loc = loc;
        } else {
          draft.push({
            id: localStorage.userId,
            name: localStorage.userName,
            loc,
          });
        }
      })
    );

    axios.post(
      "/game",
      { loc },
      {
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
      }
    );
  }, []);

  // WebSocket
  useEffect(() => {
    window.Echo.options.auth.headers.Authorization = token;

    window.Echo.private("game").listen(".game", (e) => {
      setUsers(
        produce((draft) => {
          const user = draft.find((user) => user.id === e.data.id);
          if (user) {
            user.loc = e.data.loc;
          } else {
            draft.push(e.data);
          }
        })
      );
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

    ctx.save();
    for (const user of users) {
      // ctx.font = "24px JetBrains Mono, monospace";
      // ctx.fillText(user.name, user.loc.x, user.loc.y);
      ctx.drawImage(
        document.querySelector("#character"),
        0,
        0,
        32 - 5,
        32 - 5,
        user.loc.x,
        user.loc.y,
        32,
        32
      );
    }
    ctx.restore();
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
      </div>
      <canvas id="canvas" ref={canvasRef} width="800px" height="400px" />
    </>
  );
};

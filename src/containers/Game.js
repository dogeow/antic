import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const Game = () => {
  const [game, setGame] = useState([]);
  const [backpack, setBackpack] = useState([]);

  useEffect(() => {
    axios.get("game").then((response) => {
      setGame(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("backpack").then((response) => {
      setBackpack(response.data);
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs>
          {game.name}
        </Grid>
        <Grid item xs>
          铜币
          {game.copper}
        </Grid>
        <Grid item xs>
          银币
          {game.silver}
        </Grid>
        <Grid item xs>
          金币
          {game.gold}
        </Grid>
        <Grid item xs={3}>
          经验值
          {game.exp}
/
{game.nextLevelNeedExp}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs>
          <h2>主城</h2>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              落霞岛
            </Grid>
            <Grid item xs={1}>
              中州
            </Grid>
            <Grid item xs={1}>
              热砂荒漠
            </Grid>
            <Grid item xs={1}>
              跃马平原
            </Grid>
            <Grid item xs={1}>
              死水沼泽
            </Grid>
            <Grid item xs={1}>
              禁地
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <h2>装备</h2>
          <div>头盔 项链</div>
          <div>武器 衣服</div>
          <div>手镯 手镯</div>
          <div>戒指 戒指</div>
          <div>靴子 腰带</div>
        </Grid>
      </Grid>
      <div>
        <h2>野外</h2>
        <Grid container spacing={3}>
          <Grid item xs={1}>
            矿区
          </Grid>
          <Grid item xs={1}>
            将军坟
          </Grid>
          <Grid item xs={1}>
            机关洞
          </Grid>
          <Grid item xs={1}>
            地穴
          </Grid>
          <Grid item xs={1}>
            逆魔古刹
          </Grid>
          <Grid item xs={1}>
            禁地
          </Grid>
          <Grid item xs={1}>
            通天塔
          </Grid>
          <Grid item xs={1}>
            地下魔狱
          </Grid>
          <Grid item xs={1}>
            铁血魔城
          </Grid>
          <Grid item xs={1}>
            天空之城
          </Grid>
        </Grid>
      </div>
      <div>
        <h2>背包</h2>
        <Grid container>
          {backpack.map((item, index) => (
            <Grid item xs key={index}>
              {item.name}
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Game;

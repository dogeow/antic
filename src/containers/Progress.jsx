import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import React from "react";

const Progress = () => {
  return (
    <Container component="main" maxWidth="xs">
      <h1>2021 年度计划（敦促）</h1>
      <Card>
        <CardContent>
          <h2>英语</h2>
          <ul>
            <li>单词</li>
            <li>阅读：短语、书籍（7天计划）</li>
          </ul>
          <h2>健康（跑步）</h2>
          <h2>网站（PHP + JavaScript）</h2>
          <ul>
            <li>一个基础的网站</li>
            <li>可以的话，实时 + Canvas</li>
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Progress;

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
          <h2>英语（单词、短语）</h2>
          <h2>健康</h2>
          <h2>网站（Laravel + React）</h2>
          <h2>小程序、TDD</h2>
          <h2>扩展包</h2>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Progress;

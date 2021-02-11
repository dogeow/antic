import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import * as React from "react";

const things = [
  "使用 Jenkins",
  "换成 WordPress 又改为 MediaWiki",
  "上 HTTPS",
  "最终使用阿里云 VPS，买了五年",
  "使用 React",
  "使用 Laravel",
  "架设我的世界 PC 服务器",
  "使用 GitHub WebHooks",
  "架设 Ngrok",
  "换了好几家 VPS，也迁移好几次",
  "使用 CDN",
  "谷歌之旅，你懂的",
  "使用 MediaWiki",
  "买 Linode（20美元512M内存）",
  "上班偷偷整 iframe（背景是 MJ），被看我不爽的女技术举报了",
  "使用免费的主机屋",
  "学校网页设计课程的作业，我的作品是：整合网页特效为一个网页",
];

export default function BasicTimeline() {
  return (
    <Timeline align="alternate">
      {things.map((thing, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{thing}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

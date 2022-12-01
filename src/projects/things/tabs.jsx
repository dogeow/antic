import { AddCircleOutline, PicturesOutline, SearchOutline, TagOutline } from "antd-mobile-icons";
import React from "react";

const tabs = [
  {
    key: "/things",
    title: "物品",
    icon: <SearchOutline />,
  },
  {
    key: "/things/create",
    title: "添加",
    icon: <AddCircleOutline />,
  },
  {
    key: "/things/tags",
    title: "标签",
    icon: <TagOutline />,
  },
  {
    key: "/things/photos",
    title: "照片",
    icon: <PicturesOutline />,
  },
];

export default tabs;

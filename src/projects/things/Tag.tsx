import { Box } from "@mui/system";
import { Badge } from "antd-mobile";
import React, { useEffect, useState } from "react";

import axios from "../../instance/axios";
import Bottom from "./Bottom";

// 定义 Tag 接口
interface Tag {
  name: string;
  count: number;
}

// 主要组件 TagList
const TagList: React.FC = () => {
  // 使用 useState 钩子函数初始化 tags 为空数组
  const [tags, setTags] = useState<Tag[]>([]);

  // 使用 useEffect 钩子函数来在组件加载时从后端获取 tags
  useEffect(() => {
    axios.get("/tags").then(({ data }) => {
      setTags(data);
    });
  }, []);

  // 返回JSX
  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {tags.map((tag, index) => (
          <Badge content={tag.count} style={{ margin: 10 }} key={index}>
            <Box
              component="span"
              sx={{
                margin: 2,
                fontSize: "medium",
                padding: "6px 12px",
                borderRadius: "50%",
                backgroundColor: "#2db7f5",
              }}
            >
              {tag.name}
            </Box>
          </Badge>
        ))}
      </Box>
      <Bottom />
    </Box>
  );
};

export default TagList;

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import * as React from "react";

import chromeBookmarks from "../../resources/Bookmarks.json";

const subFolder = (project) => {
  if (project.type === "folder") {
    // 文件夹
    return (
      <TreeItem key={project.id} nodeId={project.id} label={project.name}>
        {subFolder(project.children)}
      </TreeItem>
    );
  }
  if (project.type === "url") {
    // 单个链接
    return (
      <a key={project.id} href={project.url} target="_blank" rel="noopener noreferrer">
        <TreeItem nodeId={project.id} label={project.name} />
      </a>
    );
  }
  // 子目录下的所有物件
  const array = [];
  project.map((children) => array.push(subFolder(children)));

  return array;
};

const navForMobile2 = chromeBookmarks.roots.bookmark_bar.children;

const Bookmarks = () => {
  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {navForMobile2.map((children) => subFolder(children))}
    </TreeView>
  );
};

export default Bookmarks;

import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import chromeBookmarks from "../resources/Bookmarks";

const subFolder = (project) => {
  if ("folder" === project["type"]) {
    // 文件夹
    return (
      <TreeItem
        key={project["id"]}
        nodeId={project["id"]}
        label={project["name"]}
      >
        {subFolder(project["children"])}
      </TreeItem>
    );
  } else if ("url" === project["type"]) {
    // 单个链接
    return (
      <a
        key={project["id"]}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TreeItem nodeId={project["id"]} label={project["name"]} />
      </a>
    );
  } else {
    // 子目录下的所有物件
    let array = [];
    project.map((children) => array.push(subFolder(children)));

    return array;
  }
};

const bookmarks = chromeBookmarks["roots"]["bookmark_bar"]["children"];

const Bookmarks = () => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {bookmarks.map((children) => subFolder(children))}
    </TreeView>
  );
};

export default Bookmarks;

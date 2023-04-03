import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import * as React from "react";

const Bookmarks = ({ bookmarks }) => (
  <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
    {Object.keys(bookmarks).map((mainCategory) => {
      const subBookmarks = bookmarks[mainCategory];

      return (
        <TreeItem key={mainCategory} nodeId={mainCategory} label={mainCategory}>
          {Object.keys(subBookmarks).map((subCategory, index) => {
            const bookmarks = subBookmarks[subCategory];

            return (
              <TreeItem key={subCategory} nodeId={subCategory} label={subCategory}>
                {bookmarks.map((bookmark, index) => (
                  <a key={index} href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    <TreeItem nodeId={bookmark.title} label={bookmark.title} />
                  </a>
                ))}
              </TreeItem>
            );
          })}
        </TreeItem>
      );
    })}
  </TreeView>
);

export default Bookmarks;

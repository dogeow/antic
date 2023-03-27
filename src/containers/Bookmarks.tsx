import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

interface Bookmark {
  id: string;
  title: string;
  url: string;
}

interface BookmarkData {
  bookmarks: Bookmark[];
}

const BOOKMARKS = gql`
  query {
    bookmarks {
      id
      title
      url
    }
  }
`;

const Bookmarks = () => {
  const { data } = useQuery<BookmarkData>(BOOKMARKS);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (data) {
      setBookmarks(data.bookmarks);
    }
  }, [data]);

  return (
    <div style={{ lineHeight: "2rem" }}>
      {bookmarks.map((bookmark) => {
        return (
          <div key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noreferrer">
              {bookmark.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Bookmarks;

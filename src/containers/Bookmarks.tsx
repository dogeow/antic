import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

const BOOKMARKS = gql`
  query {
    bookmarks {
      id
      title
      url
    }
  }
`;

export default () => {
  const { data } = useQuery(BOOKMARKS);
  const [bookmarks, setBookmarks] = useState([]);

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

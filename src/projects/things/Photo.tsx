import "./things.css";

import { DotLoading, Grid, Image, InfiniteScroll, Skeleton, Space } from "antd-mobile";
import React, { useState } from "react";

import axios from "../../instance/axios";
import Bottom from "./Bottom";
const InfiniteScrollContent = ({ hasMore }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : (
        <span>--- 我是有底线的 ---</span>
      )}
    </>
  );
};

function Photo() {
  const [photos, setPhotos] = useState([]);
  const [paginate, setPaginate] = useState({
    current_page: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    const nextPage = paginate.current_page + 1;

    const fetchData = async (page = 1) => {
      const url = `/photos?page[number]=${page}`;
      return await axios.get(url);
    };

    await fetchData(nextPage)
      .then(({ data }) => {
        setPhotos((val) => [...val, ...data.data]);
        delete data.data;
        setPaginate(data);
        setHasMore(data.total > data.to);
      })
      .catch((error) => {
        setHasMore(false);
      });
  }

  return (
    <div style={{ margin: "8px 8px" }}>
      <Space wrap>
        {photos.map((photo) => (
          <Image
            lazy
            src={photo.path}
            width="100px"
            height="100px"
            fit="cover"
            placeholder={<Skeleton.Title style={{ width: 100, height: 100 }} />}
            style={{ borderRadius: 4 }}
            key={photo.id}
          />
        ))}
      </Space>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  );
}

export default Photo;

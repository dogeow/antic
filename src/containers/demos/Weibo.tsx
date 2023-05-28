import "../../styles/weibo.css";

import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { Grid, Hidden, Pagination, PaginationItem, Skeleton, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import random from "lodash/random";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../instance/axios";

interface WeiboItem {
  id: string;
  status: string;
  url: string;
  title: string;
  emoji: string;
  rank: number;
  updated_at: string;
}

interface WeiboData {
  current_page: number;
  last_page: number;
  per_page: number;
  data: WeiboItem[];
}

const Weibo: React.FC = () => {
  const [weibo, setWeibo] = useState<WeiboData>();
  const [selectedDate, handleDateChange] = useState<Date>(new Date());
  const [pageCount, setPageCount] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

  const setData = (data: WeiboData) => {
    setWeibo(data);
    setCurrPage(data.current_page);
    setPageCount(data.last_page);
  };

  useEffect(() => {
    const selectDate = dayjs(selectedDate).format("YYYY-MM-DD");
    axios.get(`weibo?date=${selectDate}&page[number]=${currPage}`).then(({ data }) => {
      setData(data);
    });
  }, [selectedDate, currPage]);

  return (
    <>
      <Alert severity="warning" sx={{ marginBottom: 2 }} onClick={() => handleDateChange(new Date("2022-02-28"))}>
        该功能已停止更新，只有旧数据。最后更新日期是：2022-02-28。点击该警示框跳转到该日期。
      </Alert>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <DatePicker
            label="日期"
            inputFormat="YYYY-MM-DD"
            disableFuture
            value={selectedDate}
            onChange={(value) => {
              if (value) {
                handleDateChange(value);
              }
            }}
            renderInput={(props) => <TextField {...props} />}
          />
          <div style={{ float: "right", marginRight: 12 }}>
            <Link to="/weibo/about">
              <ErrorOutline />
            </Link>
          </div>
        </Grid>
        <Grid item xs={12}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>No.</th>
                <th style={{ textAlign: "left" }}>话题</th>
                <Hidden only="xs">
                  <th>热度</th>
                  <th style={{ textAlign: "right" }}>更新于</th>
                </Hidden>
              </tr>
            </thead>
            <tbody>
              {weibo?.data
                ? weibo.data.map((item, index) => (
                    <tr key={item.id} className={item.status}>
                      <td>{weibo.per_page * (currPage - 1) + index + 1}</td>
                      <td>
                        <span style={{ float: "left" }}>
                          <a href={`https://s.weibo.com${item.url}`}>{item.title}</a>
                        </span>
                        {item.emoji && <span dangerouslySetInnerHTML={{ __html: item.emoji }} />}
                      </td>
                      <Hidden only="xs">
                        <td>{item.rank}</td>
                        <td style={{ textAlign: "right" }}>{item.updated_at}</td>
                      </Hidden>
                    </tr>
                  ))
                : Array.from(new Array(20)).map((item, index) => (
                    <tr key={index}>
                      <td colSpan={2}>
                        <Skeleton variant="rectangular" width={`${random(20, 88)}%`} height={20} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12}>
          <Pagination
            page={currPage}
            count={pageCount}
            hidePrevButton={currPage <= 1}
            hideNextButton={currPage >= weibo?.last_page}
            renderItem={(item) => (
              <PaginationItem {...item} disabled={item.page === currPage} onClick={() => setCurrPage(item.page)} />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Weibo;

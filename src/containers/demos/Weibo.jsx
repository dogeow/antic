import ErrorOutline from "@mui/icons-material/ErrorOutline";
import DatePicker from "@mui/lab/DatePicker";
import {
  Grid,
  Hidden,
  Pagination,
  PaginationItem,
  Skeleton,
  TextField,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import makeStyles from "@mui/styles/makeStyles";
import dayjs from "dayjs";
import axios from "instance/axios";
import random from "lodash/random";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  "@global": {
    img: {
      float: "left",
      width: 16,
      height: 16,
      margin: "0 2px",
    },
  },
}));

const Weibo = () => {
  useStyles();

  const [weibo, setWeibo] = useState({});
  const [selectedDate, handleDateChange] = useState(new Date());
  const [pageCount, setPageCount] = useState();
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const selectDate = dayjs(selectedDate).format("YYYY-MM-DD");
    axios
      .get(`weibo?date=${selectDate}&page[number]=${currPage}`)
      .then(({ data }) => {
        setWeibo(data);
        setCurrPage(data.current_page);
        setPageCount(data.last_page);
      });
  }, [selectedDate, currPage]);

  const handlePage = (page) => {
    axios
      .post(
        `weibo?date=${dayjs(selectedDate).format(
          "Y-MM-DD"
        )}&page[number]=${page}`
      )
      .then(({ data }) => {
        setWeibo(data);
        setCurrPage(page);
        setPageCount(data.last_page);
      });
  };

  return (
    <>
      <Alert severity="warning" style={{ marginBottom: 20 }}>
        该功能已停止更新，只有旧数据。
      </Alert>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <DatePicker
            label="日期"
            format="YYYY-MM-DD"
            disableFuture
            value={selectedDate}
            onChange={handleDateChange}
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
              {weibo.data
                ? weibo.data.map((item, index) => (
                    <tr key={item.id} className={item.status}>
                      <td>{weibo.per_page * (currPage - 1) + index + 1}</td>
                      <td>
                        <span style={{ float: "left" }}>
                          <a href={`https://s.weibo.com${item.url}`}>
                            {item.title}
                          </a>
                        </span>
                        {item.emoji && (
                          <span
                            dangerouslySetInnerHTML={{ __html: item.emoji }}
                          />
                        )}
                      </td>
                      <Hidden only="xs">
                        <td>{item.rank}</td>
                        <td style={{ textAlign: "right" }}>
                          {item.updated_at}
                        </td>
                      </Hidden>
                    </tr>
                  ))
                : Array.from(new Array(20)).map((item, index) => (
                    <tr key={index}>
                      <td colSpan={2}>
                        <Skeleton
                          variant="rectangular"
                          width={`${random(20, 88)}%`}
                          height={20}
                        />
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
            hideNextButton={currPage >= weibo.last_page}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                disabled={item.page === currPage}
                onClick={() => handlePage(item.page)}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Weibo;

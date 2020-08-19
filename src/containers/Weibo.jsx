import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import moment from "moment";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import Skeleton from "@material-ui/lab/Skeleton";
import random from "lodash/random";

const useStyles = makeStyles((theme) => ({
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

  const [data, setData] = useState({});
  const [selectedDate, handleDateChange] = useState(new Date());
  const [pageCount, setPageCout] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const selectDate = moment(selectedDate).format("Y-MM-DD");
    axios
      .post(`weibo?date=${selectDate}&page[number]=${page}`)
      .then(({ data }) => {
        setData(data);
        setPage(data.current_page);
        setPageCout(data.last_page);
      });
  }, [selectedDate, page]);

  const handlePage = (page) => {
    axios
      .post(
        `weibo?date=${moment(selectedDate).format(
          "Y-MM-DD"
        )}&page[number]=${page}`
      )
      .then(({ data }) => {
        setData(data);
        setPage(page);
        setPageCout(data.last_page);
      });
  };

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="日期"
          format="Y-MM-DD"
          disableFuture
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          style={{ marginLeft: 12 }}
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
            {data.data
              ? data.data.map((item, index) => (
                  <tr key={index} className={item.status}>
                    <td>{data.per_page * (page - 1) + index + 1}</td>
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
                      <td style={{ textAlign: "right" }}>{item.updated_at}</td>
                    </Hidden>
                  </tr>
                ))
              : Array.from(new Array(20)).map((item, index) => (
                  <tr key={index}>
                    <td colSpan={2}>
                      <Skeleton
                        variant="rect"
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
          page={page}
          count={pageCount}
          hidePrevButton={page <= 1}
          hideNextButton={page >= data.last_page}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              disabled={item.page === page}
              onClick={() => handlePage(item.page)}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Weibo;

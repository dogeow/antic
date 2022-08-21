import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import makeStyles from "@mui/styles/makeStyles";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";

import axios from "../instance/axios.js";

dayjs.extend(relativeTime);

const useStyles = makeStyles(() => ({
  tableRoot: {
    overflowX: "auto",
  },
  root: {
    color: "green",
  },
}));

const Site = () => {
  const classes = useStyles();
  const [sites, setSites] = useState([]);

  const columns = [
    {
      field: "domain",
      headerName: "站点",
      width: 180,
      renderCell: (params) => (
        <a href={`http://${params.row.domain}`} target="_blank" rel="noopener noreferrer">
          {params.row.domain}
        </a>
      ),
    },
    {
      field: "online",
      headerName: "在线",
      renderCell: (params) =>
        params.row.online ? (
          <RadioButtonChecked className={classes.root} />
        ) : (
          <RadioButtonChecked style={{ color: "red" }} />
        ),
    },
    {
      field: "today_latest",
      headerName: "更新",
      renderCell: (params) =>
        params.row?.today_latest?.status ? <Check className={classes.root} /> : <Close style={{ color: "red" }} />,
    },
    {
      field: "last_updated_at",
      headerName: "最后更新于",
      renderCell: (params) => (params.row.last_updated_at ? dayjs(params.row.last_updated_at).fromNow() : "-"),
    },
    {
      field: "note",
      headerName: "备注",
    },
  ];

  useEffect(() => {
    axios
      .get("site")
      .then((json) => {
        setSites(json.data.sites);
      })
      .catch((error) => {
        window.console.log(error);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={sites}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[10, 50]}
        disableSelectionOnClick
        autoHeight
      ></DataGrid>
    </div>
  );
};

export default Site;

import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import makeStyles from "@mui/styles/makeStyles";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";
import { useEffect } from "react";
import useSWR from "swr";

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

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  const { data, error } = useSWR("/site");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const columns = [
    {
      field: "domain",
      headerName: "站点",
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <a href={`http://${params.row.domain}`} target="_blank" rel="noopener noreferrer">
          {params.row.domain}
        </a>
      ),
    },
    {
      field: "is_online",
      headerName: "在线",
      renderCell: (params: GridRenderCellParams) =>
        params.row.is_online ? (
          <RadioButtonChecked className={classes.root} />
        ) : (
          <RadioButtonChecked style={{ color: "red" }} />
        ),
    },
    {
      field: "is_new",
      headerName: "更新",
      renderCell: (params: GridRenderCellParams) =>
        params.row.is_new ? <Check className={classes.root} /> : <Close style={{ color: "red" }} />,
    },
    {
      field: "last_updated_at",
      headerName: "最后更新于",
      renderCell: (params: GridRenderCellParams) =>
        params.row.last_updated_at ? dayjs(params.row.last_updated_at).fromNow() : "-",
    },
    {
      field: "note",
      headerName: "备注",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={() => {
          const options = {
            body: "This is the body of the Notification",
            icon: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            dir: "ltr",
          };
          const notification = new Notification("Notification Demo", options);
          setTimeout(() => {
            notification.close();
          }, 1000);
        }}
      >
        测试通知
      </button>
      <DataGrid
        rows={data.sites}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[10, 50]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default Site;

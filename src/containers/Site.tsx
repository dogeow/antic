import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as React from "react";
import useSWR from "swr";

dayjs.extend(relativeTime);

interface SiteData {
  domain: string;
  is_online: boolean;
  is_new: boolean;
  last_updated_at: string | null;
  note: string;
}

const Site = () => {
  const { data, error } = useSWR<{ sites: SiteData[] }>("/site");
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
          <RadioButtonChecked sx={{ color: "green" }} />
        ) : (
          <RadioButtonChecked sx={{ color: "red" }} />
        ),
    },
    {
      field: "is_new",
      headerName: "更新",
      renderCell: (params: GridRenderCellParams) =>
        params.row.is_new ? <Check sx={{ color: "green" }} /> : <Close sx={{ color: "red" }} />,
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
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={data.sites}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[10, 50]}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
};

export default Site;

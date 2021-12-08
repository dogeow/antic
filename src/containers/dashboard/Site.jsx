import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "instance/axios";
import React, { useEffect, useState } from "react";

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
    <div>
      <Paper className={classes.tableRoot}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>站点</TableCell>
              <TableCell>在线</TableCell>
              <TableCell>更新</TableCell>
              <TableCell>最后更新于</TableCell>
              <TableCell>收录</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell component="td" scope="row">
                  <a
                    href={`http://${site.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.domain}
                  </a>
                </TableCell>
                <TableCell component="td" scope="row">
                  {site.online ? (
                    <RadioButtonChecked className={classes.root} />
                  ) : (
                    <RadioButtonChecked style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell component="td" scope="row">
                  {site.today_latest && site.today_latest.status ? (
                    <Check className={classes.root} />
                  ) : (
                    <Close style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell>{site.last_updated_at}</TableCell>
                <TableCell component="td" scope="row">
                  {site.seo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Site;

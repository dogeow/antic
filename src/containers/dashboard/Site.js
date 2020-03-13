import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import makeStyles from "@material-ui/core/styles/makeStyles";
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    overflowX: 'auto',
  },
  root: {
    color: 'green',
  },
}));

const Site = () => {
  const classes = useStyles();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    axios
      .get("site")
      .then(json => {
        setSites(json.data.sites)
      })
      .catch(error => {
        console.log(error);
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
              <TableCell>收录</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map(site => (
              <TableRow key={site.id}>
                <TableCell component="td" scope="row">
                  <a href={`http://${site.domain}`} target="_blank" rel="noopener noreferrer">{site.domain}</a>
                </TableCell>
                <TableCell component="td" scope="row">
                  {
                    site.online
                      ?
                      <RadioButtonChecked className={classes.root}/>
                      :
                      <RadioButtonChecked style={{color: 'red'}}/>
                  }
                </TableCell>
                <TableCell component="td" scope="row">
                  {
                    site.today_latest && site.today_latest.status
                      ?
                      <Check className={classes.root}/>
                      :
                      <Close style={{color: 'red'}}/>
                  }
                </TableCell>
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

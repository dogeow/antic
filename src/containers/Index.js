import React, { useEffect, useState } from 'react'
import axios from 'axios'

// UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Footer from '../containers/Footer'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  hr: {
    border: 'none',
    borderBottom: '1px dashed #DaDaDa',
    height: '1px',
    margin: '10px 10px'
  },
  tableRoot: {
    overflowX: 'auto',
  }
}));

const Index = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("todo").then(response => {
      setTodo(response.data);
      setLoading(false);
    })
  }, []);

  return (
    <>
      <Paper className={classes.tableRoot}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Todo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading ? Array.from(new Array(10)) : todo).map((row, index) => (
              <TableRow key={index}>
                <TableCell component="td" scope="row">
                  {row ? row.title : <Skeleton variant="rect" height={20}/>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <hr className={classes.hr}/>
      <Footer/>
    </>
  )
};

export default Index;

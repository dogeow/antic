import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Footer from '../containers/Footer'
import { logged } from '../helpers'
import Skeleton from '@material-ui/lab/Skeleton'
import { loginAction } from "../actions";

const useStyles = makeStyles(theme => ({
  hr: {
    border: 'none',
    borderBottom: '1px dashed #DaDaDa',
    height: '1px',
    margin: '10px 10px'
  },
  tableRoot: {
    overflowX: 'auto',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
}));

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("todo").then(response => {
      setTodo(response.data);
      setLoading(false);
    })
  }, []);

  const testLogin = () => {
    axios.post("user/login", {
      email: 'test@test.com',
      password: 'test@test.com',
      rememberMe: true
    }).then(response => {
      let {access_token} = response.data;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      logged(access_token);
      axios.post("user/profile").then(response2 => {
        let {id, name, email} = response2.data.user;
        dispatch(loginAction(access_token, id, name, email));
      });
    })
  };

  return (
    <>
      <div className={classes.top}>
        <Button variant="contained" color="primary" onClick={testLogin}>测试账号登录</Button>
      </div>
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

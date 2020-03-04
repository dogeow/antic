import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const Api = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post('api').then((resp) => {
      setData(resp.data);
    })
  }, []);

  return (
    <div>
      <Typography component="h3" variant="h6">
        前缀：{process.env.REACT_APP_API_URL}
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">api</TableCell>
              <TableCell align="right">介绍</TableCell>
              <TableCell align="right">举例</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.endpoint}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default Api;

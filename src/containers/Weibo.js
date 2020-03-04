import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles"
import { KeyboardDatePicker } from '@material-ui/pickers'
import axios from 'axios'
import moment from 'moment'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  '@global': {
    img: {
      float: 'left',
      width: 16,
      height: 16,
      margin: '0 2px',
    },
    table: {
      width: '100%'
    },
  },
  root: {
    marginLeft: -16,
    marginRight: -16
  },
  picker: {
    marginLeft: 16,
    marginRight: 16
  }
}));


const Weibo = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    axios.post("weibo", {
      date: moment(selectedDate).format('Y-MM-DD')
    }).then(response => {
      setData(response.data);
    })
  }, [selectedDate]);

  return (
    <div className={classes.root}>
      <div>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="日期"
          format="Y-MM-DD"
          disableFuture={true}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{marginLeft: 12}}
        />
        <div style={{float: 'right', marginRight: 12}}>
          <Link to={'weibo/about'}><ErrorOutline/></Link>
        </div>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <th>No.</th>
            <th>话题</th>
            <th>热度</th>
            <th style={{textAlign: "right"}}>更新于</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, index) => (
              <tr key={index} className={item.status}>
                <td>{index + 1}</td>
                <td>
                  <span style={{float: "left"}}><a href={`https://s.weibo.com${item.url}`}>{item.title}</a></span>
                  {item.emoji && <span dangerouslySetInnerHTML={{__html: item.emoji}}/>}
                </td>
                <td>{item.rank}</td>
                <td style={{textAlign: "right"}}>{item.updated_at}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Weibo

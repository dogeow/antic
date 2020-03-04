import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles"
import { DatePicker, } from '@material-ui/pickers'
import axios from 'axios'

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
    axios.get("weibo/30").then(response => {
      setData(response.data);
    })
  }, []);

  return (
    <div className={classes.root}>
      <DatePicker
        className={classes.picker}
        style={{marginBottom: 20}}
        value={selectedDate}
        onChange={handleDateChange}/>
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

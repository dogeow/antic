import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles"
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
    console.log(classes.new);
    axios
      .get("weibo/30")
      .then(response => {
        return response;
      })
      .then(json => {
        setData(json.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <div className={classes.root}>
      <DatePicker className={classes.picker} style={{marginBottom: 20}} value={selectedDate} onChange={handleDateChange}/>
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
          {data.map((news, index) => (
            <tr key={index} className={news.status}>
              <td>{index + 1}</td>
              <td>
                <span style={{float: "left"}}><a href={`https://s.weibo.com${news.url}`}>{news.title}</a></span>
                {news.emoji && <span dangerouslySetInnerHTML={{__html: news.emoji}}/>}
              </td>
              <td>{news.rank}</td>
              <td style={{textAlign: "right"}}>{news.updated_at}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Weibo

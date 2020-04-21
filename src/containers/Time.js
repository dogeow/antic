import React from 'react';
import moment from 'moment';

const now = moment().format('YYYY-MM-DD');
const zero = moment(now).format('YYYY-MM-DD HH:mm:ss');
const today = moment(zero).unix();
const yesterday = moment(zero).subtract(1, 'days').unix();
const tomorrow = moment(zero).add(1, 'days').unix();

const Time = () => {
  return (
    <div>
      <h2>昨天</h2>
      <div>开始时间戳：{yesterday}({moment(zero).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')})</div>
      <div>结束时间戳：{yesterday+86400-1}({moment(zero).subtract(2, 'days').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')})</div>
      <h2>今天</h2>
      <div>开始时间：{zero}</div>
      <div>开始时间戳：{today}</div>
      <div>当前日期时间：{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
      <div>当前日期时间戳：{moment().unix()}</div>
      <div>结束时间：{moment(now).add(86400-1, 'second').format('YYYY-MM-DD HH:mm:ss')}</div>
      <div>结束时间戳：{today+86400-1}</div>
      <h2>明天</h2>
      <div>开始时间戳：{tomorrow}({moment(zero).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')})</div>
      <div>结束时间戳：{tomorrow+86400-1}({moment(zero).add(2, 'days').subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss')})</div>
    </div>
  );
};

export default Time;

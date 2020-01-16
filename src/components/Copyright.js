import { Link } from 'react-router-dom'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}<Link to="/">滑稽实验室</Link>{' '}{new Date().getFullYear()}{'.'}
  </Typography>
);

export default Copyright;

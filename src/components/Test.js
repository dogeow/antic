import React from 'react'
import Button from '@material-ui/core/Button'
import { useSnackbar } from 'notistack'

const Test = () => {
  const {enqueueSnackbar} = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar('I love hooks', {
      variant: 'success',
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>Show snackbar</Button>
  );
};

export default Test;

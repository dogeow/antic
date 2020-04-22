import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
  },
}));

const Settings = (props) => {
  const classes = useStyles();

  function handleClose() {
    props.onClose();
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog"
            open={props.open} classes={{
      root: classes.root,
    }}>
      <DialogTitle id="simple-dialog-title">设置</DialogTitle>
      <FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={props.themePaletteType === 'dark'}
              onClick={props.onThemeClick}
              value="themePaletteType"
              inputProps={{'aria-label': '夜晚模式'}}
            />
          }
          label="夜晚模式"
        />
      </FormControl>
    </Dialog>
  );
};

export default Settings;

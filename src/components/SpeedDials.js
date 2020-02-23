import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import SaveIcon from '@material-ui/icons/Save'
import PrintIcon from '@material-ui/icons/Print'
import ShareIcon from '@material-ui/icons/Share'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  speedDial: {
    transform: 'translateZ(0px)',
    position: 'fixed',
    top: `calc(100% - 368px)`,
    right: 16
  },
}));

const actions = [
  {icon: <FileCopyIcon/>, name: 'Copy'},
  {icon: <SaveIcon/>, name: 'Save'},
  {icon: <PrintIcon/>, name: 'Print'},
  {icon: <ShareIcon/>, name: 'Share'},
  {icon: <DeleteIcon/>, name: 'Delete'},
];

const SpeedDials = () => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      hidden={hidden}
      icon={<SpeedDialIcon/>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction={direction}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDials;

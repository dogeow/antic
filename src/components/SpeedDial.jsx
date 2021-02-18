import SpeedDial from "@material-ui/core/SpeedDial";
import SpeedDialAction from "@material-ui/core/SpeedDialAction";
import SpeedDialIcon from "@material-ui/core/SpeedDialIcon";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    "&.MuiSpeedDial-directionUp": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}));

export default function SpeedDials(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {props.actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => {
            action.action();
          }}
        />
      ))}
    </SpeedDial>
  );
}

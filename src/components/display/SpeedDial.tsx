import { SpeedDial, SpeedDialAction, SpeedDialIcon, Theme } from "@mui/material/";
import { createStyles, makeStyles } from "@mui/styles";
import * as React from "react";

interface Action {
  name: string;
  icon: JSX.Element;
  action: () => void;
}

interface Props {
  actions: Action[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "fixed",
      "&.MuiSpeedDial-directionUp": {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
    },
  })
);

const SpeedDials: React.FC<Props> = ({ actions }) => {
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
      {actions.map((action) => (
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
};

export default SpeedDials;

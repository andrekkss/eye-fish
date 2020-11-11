import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function FabButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title={props.name} aria-label={props.label}>
        <Fab color={props.color} className={classes.absolute}>
          {props.icon}
        </Fab>
      </Tooltip>
    </div>
  );
}
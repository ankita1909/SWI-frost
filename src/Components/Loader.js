import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


// Inspired by the Facebook spinners.
const useStyles = makeStyles({
  loader: {
    color: '#309afc',
    textAlign: 'center',
  }
});

export default function CustomLoader(props) {
  const classes = useStyles();

  return (
    <CircularProgress size={24} className={classes.loader}/>
  );
}
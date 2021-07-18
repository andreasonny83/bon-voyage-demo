import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImpalaLogo from '../logo.svg';
const useStyles = makeStyles({
  root: {},
  img: {
    width: '180px',
    height: '60px',
  },
});

export const HeaderLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.img} src={ImpalaLogo} alt="Impala" />
    </div>
  );
};

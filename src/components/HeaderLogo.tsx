import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImpalaLogo from '../logo.svg';
import { Link } from '@material-ui/core';
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
      <Link href="/">
        <img className={classes.img} src={ImpalaLogo} alt="Impala" />
      </Link>
    </div>
  );
};

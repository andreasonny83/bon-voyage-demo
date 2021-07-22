import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { HeaderLogo } from './HeaderLogo';
import { NavBar } from './NavBar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '70px',
  },
  appBar: {
    display: 'flex',
    width: '100%',
  },
});

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.appBar}>
          <HeaderLogo />
          <NavBar />
        </div>
      </Container>
    </div>
  );
};

import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '100px',
  },
}));

export const NotFound = () => {
  const classes = useStyles();

  return (
    <div className="NotFound">
      <Container className={classes.root}>
        <Typography variant="h2" align="center">
          Page not found
        </Typography>
      </Container>
    </div>
  );
};

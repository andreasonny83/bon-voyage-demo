import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import PersonOutline from '@material-ui/icons/PersonOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '60px',
  },
  search: {
    backgroundColor: '#f9f0ec',
    color: theme.palette.primary.dark,
    fontWeight: 500,
    marginLeft: theme.spacing(1),

    '&:hover': {
      backgroundColor: '#f9f0ec',
      color: theme.palette.primary.main,
    },
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionWrapper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '&:hover': {
      background: 'inherit',
      color: theme.palette.primary.dark,
    },
  },
  navigationAction: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));

export const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.navigationButtons}>
        <Button disableRipple className={classes.actionWrapper}>
          <div className={classes.navigationAction}>
            <FavoriteBorder />
            <Typography variant="caption">Favourites</Typography>
          </div>
        </Button>
        <Button disableRipple className={classes.actionWrapper}>
          <div className={classes.navigationAction}>
            <PersonOutline />
            <Typography variant="caption">User</Typography>
          </div>
        </Button>
      </div>
      <Button variant="contained" color="primary">
        Sign In
      </Button>
    </div>
  );
};

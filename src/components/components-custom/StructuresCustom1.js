import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize, fade, darken, lighten } from '@material-ui/core/styles/colorManipulator';

import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
}
));

export default function Component(props) {
  const classes = useStyles();

  return (
<div>
  <Grid container spacing={4}>
    <Grid item xs={12} lg={3} md={6}>
      Column 1
    </Grid>
    <Grid item xs={12} lg={3} md={6}>
      Column 2
    </Grid>
    <Grid item xs={12} lg={3} md={6}>
      Column 3
    </Grid>
    <Grid item xs={12} lg={3} md={6}>
      Column 4
    </Grid>
  </Grid>
</div>
  );
}
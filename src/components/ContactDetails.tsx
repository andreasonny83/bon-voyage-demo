import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';

interface ContactDetailsProps {
  email?: string;
  phoneNumber?: string;
}

export const ContactDetails = (props: ContactDetailsProps) => {
  const { email, phoneNumber } = props;

  return (
    <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant="h3">Reservation Email</Typography>
      {email ? <Typography><Link href={`mailto:${email}`}>{email}</Link></Typography> : <Typography>N/A</Typography>}
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h3">Phone Number</Typography>
      {phoneNumber ? <Typography><Link href={`phone:${phoneNumber}`}>{phoneNumber}</Link></Typography> : <Typography>N/A</Typography>}
    </Grid>
  </Grid>
);
};

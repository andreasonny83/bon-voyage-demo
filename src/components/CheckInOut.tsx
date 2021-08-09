import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import DatePicker from 'react-datepicker';

interface CheckInOutProps {
  checkIn: Date;
  checkOut: Date;
  onCheckIn: (date: Date) => void;
  onCheckOut: (date: Date) => void;
}

export const CheckInOut = (props: CheckInOutProps) => {
  const { checkIn, checkOut, onCheckIn, onCheckOut } = props;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={3} md={6}>
        <Typography>Check-in:</Typography>
        <DatePicker selected={checkIn} onChange={onCheckIn} name="startDate" dateFormat="MM/dd/yyyy" />
      </Grid>
      <Grid item xs={12} lg={3} md={6}>
        <Typography>Check-out:</Typography>
        <DatePicker selected={checkOut} onChange={onCheckOut} name="startDate" dateFormat="MM/dd/yyyy" />
      </Grid>
    </Grid>
  );
};

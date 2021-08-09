import React from 'react';
import { Avatar, Box, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import DnsIcon from '@material-ui/icons/Dns';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { HotelDataAddress, HotelImage, HotelLocation } from '../types';

interface HotelSummaryProps {
  countryName: string;
  name: string;
  description: string;
  phoneNumber: string;
  websiteUrl: string;
  starRating: number;
  location: HotelLocation;
  address: HotelDataAddress;
  image: HotelImage;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
  },
  media: {
    height: '512px',
  },
  iconWrapper: {
    backgroundColor: alpha(theme.palette.background.default, 0.6),
  },
  img: {
    maxWidth: '100%',
  },
  amenity: {
    margin: theme.spacing(0.5),
  },
}));

export const HotelSummary = (props: HotelSummaryProps) => {
  const classes = useStyles();
  const { name, countryName, description, address, phoneNumber, websiteUrl, location, starRating, image } = props;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="overline" color="textSecondary">
            {countryName}
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom={true}>
            <Typography color="primary" variant="h3" component="span">
              {name} {countryName}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" paragraph={true}>
            {description}
          </Typography>
          <Typography variant="h3">Address</Typography>
          <Typography>
            {address.line1} {address.line2}
          </Typography>
          <Typography>
            {address.postalCode} {address.city} {address.countryName}
          </Typography>
          <Typography>
            <Link href={`https://www.google.com/maps/?q=${location.latitude},${location.longitude}`}>
              Show Location
            </Link>
          </Typography>

          <div>
            <Box mt={3} mb={2} display="flex" alignItems="center">
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <ApartmentIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>
                {websiteUrl}
              </Typography>
            </Box>
            <Box mb={2} display="flex" alignItems="center">
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <DnsIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>
                {phoneNumber}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box pr={2}>
                <Avatar className={classes.iconWrapper} variant="rounded">
                  <TapAndPlayIcon color="primary" />
                </Avatar>
              </Box>
              <Typography variant="h6" component="h3" gutterBottom={true}>
                {starRating}
              </Typography>
            </Box>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <img key={image.url} width="100%" src={image.url} alt={image.altText} />
      </Grid>
    </Grid>
  );
};

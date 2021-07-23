import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, fade } from '@material-ui/core/styles/';
import { CircularProgress, Container, Grid, Typography, Link } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { HotelData } from '../types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import DnsIcon from '@material-ui/icons/Dns';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
//import CommentIcon from '@material-ui/icons/Comment';
import ApartmentIcon from '@material-ui/icons/Apartment';
//import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
//import FolderSharedIcon from '@material-ui/icons/FolderShared';
//import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
//import StorefrontIcon from '@material-ui/icons/Storefront';

interface RouteProps {
  hotelId: string;
}

/*const content = {
  'col1-header': 'Fusce bibendum',
  'col1-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
  'col2-header': 'Fusce bibendum',
  'col2-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
  'col3-header': 'Mauris imperdiet',
  'col3-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
  'col4-header': 'Donec fermentum',
  'col4-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
  'col5-header': 'Donec fermentum',
  'col5-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
  'col6-header': 'Aliquam pellentesque',
  'col6-desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id lorem eget purus maximus suscipit nec vitae quam.',
};*/

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
    backgroundColor: fade(theme.palette.background.default, 0.6),
  },
  img: {
    maxWidth: '100%',
  },
}));




export const Details = () => {
  const classes = useStyles();
  const { hotelId } = useParams<RouteProps>();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<HotelData>();

  const showDetails = useCallback((hotelId: string) => {
    const url = `/.netlify/functions/get-hotel?hotelId=${hotelId}`;
    setLoading(true);

    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setDetails(response);
        });
    } catch (err) {
      setLoading(false);
      setDetails(undefined);
    }
  }, []);

  useEffect(() => {
    showDetails(hotelId);
  }, [showDetails, hotelId]);

  if (loading) {
    return (
      <Container>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (!details) {
    return (
      <Container>
        <Grid container justifyContent="center">
          <Typography align="center" variant="h4">
            No results
          </Typography>
        </Grid>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" gutterBottom>
              {details.name}
            </Typography>
            <Grid container justifyContent="center">
              <Rating value={details.starRating} readOnly></Rating>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <section>
              <Container maxWidth="lg">
                <Box py={10}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="overline" color="textSecondary">
                          {details.address.countryName}{' '}
                        </Typography>
                        <Typography variant="h3" component="h2" gutterBottom={true}>
                          <Typography color="primary" variant="h3" component="span">
                            {details.name}{' '}
                          </Typography>
                          <Typography variant="h3" component="span">
                            {details.address.countryName}
                          </Typography>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" paragraph={true}>
                          {details.description.short}
                        </Typography>
                        <div>
                          <Box mt={3} mb={2} display="flex" alignItems="center">
                            <Box pr={2}>
                              <Avatar className={classes.iconWrapper} variant="rounded">
                                <ApartmentIcon color="primary" />
                              </Avatar>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom={true}>
                              {details.websiteUrl}
                            </Typography>
                          </Box>
                          <Box mb={2} display="flex" alignItems="center">
                            <Box pr={2}>
                              <Avatar className={classes.iconWrapper} variant="rounded">
                                <DnsIcon color="primary" />
                              </Avatar>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom={true}>
                              {details.phoneNumbers[0]}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <Box pr={2}>
                              <Avatar className={classes.iconWrapper} variant="rounded">
                                <TapAndPlayIcon color="primary" />
                              </Avatar>
                            </Box>
                            <Typography variant="h6" component="h3" gutterBottom={true}>
                              {details.starRating}
                            </Typography>
                          </Box>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {details.images
                        .filter((image) => image.isHeroImage)
                        .map((image) => (
                          <img key={image.url} width="100%" src={image.url} alt={image.altText} />
                        ))}
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </section>{' '}
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1} direction="column">
              <Typography variant="h3">Address</Typography>
              <Typography>
                {details.address.line1} {details.address.line2}
              </Typography>
              <Typography>
                {details.address.postalCode} {details.address.city} {details.address.countryName}
              </Typography>
              <Typography>
                <Link
                  href={`https://www.google.com/maps/?q=${details.location.latitude},${details.location.longitude}`}
                >
                  Show Location
                </Link>
              </Typography>
            </Grid>
          </Grid>

          {details.images
            .filter((image) => image.isHeroImage)
            .map((image) => (
              <img key={image.url} width="100%" src={image.url} alt={image.altText} />
            ))}

          <Grid item xs={12}>
            <Typography variant="h3">Most popular facilities</Typography>

            {details.amenities?.length ? (
              <ul>
                {details.amenities?.map((amenity) => (
                  <li key={`${amenity.code}`}>
                    <Typography>{amenity.formatted}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>



          <Grid item xs={12}>
            <Typography variant="h3">Check-in/Check-out Information</Typography>
            {details ? (
              <Grid container spacing={4}>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography>Checkin From {details?.checkIn?.from}</Typography>
                </Grid>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography>Checkout To {details?.checkOut?.to}</Typography>
                </Grid>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography variant="h3">Reservation Email</Typography>
                  {details.emails[0] ? <Typography>{details.emails[0]}</Typography> : <Typography>N/A</Typography>}
                </Grid>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography variant="h3">Phone Number</Typography>
                  <Typography>{details.phoneNumbers[0]}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <section>
              <Typography variant="h3">Hotel Rooms</Typography>
              <Box pt={8} pb={10} textAlign="center">
                <Grid container spacing={4} justifyContent="space-evenly" alignItems="center">
                  {details.roomTypes?.map((roomType) => (
                    <Grid item xs={2} md={3} key={`${roomType.roomTypeId}`}>
                      <Card>
                        <CardActionArea href="#">
                          <CardMedia
                            className={classes.media}
                            image={roomType.images[0].url + '?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Container maxWidth="sm">
                  <Box mt={4}>
                    <Typography variant="h6" component="h3" gutterBottom={true}>
                      {details.name} has {details.roomTypes?.length} lovely rooms for you to choose from.
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      You can check more picturees and details of each room below.
                    </Typography>
                  </Box>
                </Container>
              </Box>
            </section>{' '}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

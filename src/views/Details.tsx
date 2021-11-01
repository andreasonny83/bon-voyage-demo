import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles/';
<<<<<<< HEAD
import { CircularProgress, Container, Grid, Typography, Link, ImageList, ImageListItem, Chip } from '@material-ui/core';
import DatePicker from 'react-datepicker';
=======
import { CircularProgress, Container, Grid, Typography, Chip, Button } from '@material-ui/core';
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import 'react-datepicker/dist/react-datepicker.css';

import { HotelData } from '../types';
<<<<<<< HEAD
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import DnsIcon from '@material-ui/icons/Dns';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import ApartmentIcon from '@material-ui/icons/Apartment';

import 'react-datepicker/dist/react-datepicker.css';
=======
import { CheckInOut } from '../components/CheckInOut';
import { ContactDetails } from '../components/ContactDetails';
import { HotelSummary } from '../components/HotelSummary';
import { HotelImages } from '../components/HotelImages';
import { formatDate } from '../helpers/format-date';
import { FindRoom } from '../components/FindRoom';
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6

interface RouteProps {
  hotelId: string;
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

export const Details = () => {
  const classes = useStyles();
  const { hotelId } = useParams<RouteProps>();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<HotelData>();
<<<<<<< HEAD
  const [checkIn, setCheckIn] = React.useState(new Date('2014-08-18T21:11:54'));
  const [checkOut, setCheckOut] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleCheckIn = (date: any) => {
    setCheckIn(date);
  };

  const handleCheckOut = (date: any) => {
    setCheckOut(date);
=======
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [checkDates, setCheckDates] = useState(false);

  const handleCheckIn = (date: Date) => {
    setCheckDates(false);
    setCheckIn(date);
    if (checkOut < date) {
      const nextDay = new Date();
      nextDay.setDate(date.getDate() + 1);

      setCheckOut(nextDay);
    }
  };

  const handleCheckOut = (date: Date) => {
    setCheckDates(false);
    setCheckOut(date);
    if (checkIn > date) {
      setCheckIn(date);
    }
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
  };

  const showDetails = useCallback((hotelId: string, start?: string, end?: string) => {
    const url = `/.netlify/functions/get-hotel?hotelId=${hotelId}&start=${start}&end=${end}`;
    setLoading(true);

    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          if (response.hotelId) {
            setLoading(false);
            setDetails(response);
            if (start && end) {
              setCheckDates(true);
            }
            return;
          }

          setLoading(false);
          setDetails(undefined);
        });
    } catch (err) {
      setLoading(false);
      setDetails(undefined);
    }
  }, []);

  useEffect(() => {
    showDetails(hotelId);
  }, [showDetails, hotelId]);

  const checkAvailability = useCallback(() => {
    const start = formatDate(checkIn);
    const end = formatDate(checkOut);
    showDetails(hotelId, start, end);
  }, [checkIn, checkOut, hotelId, showDetails]);

  if (loading) {
    return (
      <Container>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Check-in/Check-out Information</Typography>
            <CheckInOut checkIn={checkIn} checkOut={checkOut} onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} />
          </Grid>

<<<<<<< HEAD
          <Grid item xs={12}>
            <Typography variant="h3">Check-in/Check-out Information</Typography>
            {details ? (
              <Grid container spacing={4}>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography>Check-in:</Typography>
                  <DatePicker selected={checkIn} onChange={handleCheckIn} name="startDate" dateFormat="MM/dd/yyyy" />
                </Grid>
                <Grid item xs={12} lg={3} md={6}>
                  <Typography>Check-out:</Typography>
                  <DatePicker selected={checkOut} onChange={handleCheckOut} name="startDate" dateFormat="MM/dd/yyyy" />
                </Grid>
              </Grid>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            {details ? (
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h3">Reservation Email</Typography>
                  {details.emails[0] ? <Typography>{details.emails[0]}</Typography> : <Typography>N/A</Typography>}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h3">Phone Number</Typography>
                  <Typography>{details.phoneNumbers[0]}</Typography>
                </Grid>
              </Grid>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <section>
              <Container maxWidth="lg">
                <Box py={10}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="overline" color="textSecondary">
                          {details.address.countryName}
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
            </section>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">Most popular facilities</Typography>

            <div>
              {details.amenities?.length ? (
                details.amenities?.map((amenity) => (
                  <Chip className={classes.amenity} key={`${amenity.code}`} label={amenity.formatted} />
                ))
              ) : (
                <Typography>N/A</Typography>
              )}
            </div>
          </Grid>

          <Grid item xs={12}>
            <section>
              <Typography variant="h3">Hotel Rooms</Typography>
              <ImageList rowHeight={300} cols={2}>
                {details.roomTypes?.map((roomType) => (
                  <ImageListItem key={roomType.roomTypeId}>
                    <img
                      src={roomType.images[0].url + '?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'}
                      alt={roomType.images[0].altText}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Container maxWidth="sm">
                <Box mt={4}>
                  <Typography variant="h6" component="h3" gutterBottom={true}>
                    {details.name} has {details.roomTypes?.length} lovely rooms for you to choose from.
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    You can check more pictures and details of each room below.
                  </Typography>
                </Box>
              </Container>
            </section>
          </Grid>
=======
          {!checkDates ? (
            <Button onClick={checkAvailability} color="secondary" variant="contained">
              Check available dates
            </Button>
          ) : (
            <FindRoom checkIn={checkIn} checkOut={checkOut} hotelId={hotelId} roomTypes={details?.roomTypes} />
          )}

          {details ? (
            <Box>
              <Grid item xs={12}>
                <Typography variant="h2" align="center" gutterBottom>
                  {details.name}
                </Typography>
                <Grid container justifyContent="center">
                  <Rating value={details.starRating} readOnly></Rating>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {details ? (
                  <ContactDetails email={details.emails?.[0]} phoneNumber={details.phoneNumbers?.[0]} />
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <section>
                  <Container maxWidth="lg">
                    <Box py={10}>
                      <HotelSummary
                        name={details.name}
                        countryName={details.address.countryName}
                        description={details.description.short}
                        address={details.address}
                        phoneNumber={details.phoneNumbers[0]}
                        websiteUrl={details.websiteUrl}
                        location={details.location}
                        starRating={details.starRating}
                        image={details.images.filter((image) => image.isHeroImage)[0]}
                      />
                    </Box>
                  </Container>
                </section>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h3">Most popular facilities</Typography>

                <Box>
                  {details.amenities?.length ? (
                    details.amenities?.map((amenity) => (
                      <Chip className={classes.amenity} key={`${amenity.code}`} label={amenity.formatted} />
                    ))
                  ) : (
                    <Typography>N/A</Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <HotelImages name={details.name} roomTypes={details.roomTypes} />
              </Grid>
            </Box>
          ) : (
            <Grid container justifyContent="center">
              <Typography align="center" variant="h4">
                No room available on the selected days
              </Typography>
            </Grid>
          )}
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
        </Grid>
      </Container>
    </div>
  );
};

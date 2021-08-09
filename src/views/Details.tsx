import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles/';
import { CircularProgress, Container, Grid, Typography, Chip, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import 'react-datepicker/dist/react-datepicker.css';

import { HotelData } from '../types';
import { CheckInOut } from '../components/CheckInOut';
import { ContactDetails } from '../components/ContactDetails';
import { HotelSummary } from '../components/HotelSummary';
import { HotelImages } from '../components/HotelImages';
import { formatDate } from '../helpers/format-date';
import { FindRoom } from '../components/FindRoom';

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
        </Grid>
      </Container>
    </div>
  );
};

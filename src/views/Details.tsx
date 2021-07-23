import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography, Link } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { HotelData } from '../types';

interface RouteProps {
  hotelId: string;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
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
            <Typography>{details.description.short}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">Most popular facilities</Typography>

            {details.amenities?.length ? (
              <ul>
                {details.amenities.map((amenity) => (
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
            <Typography variant="h3">General Phone Number</Typography>
            {details.phoneNumbers[0] ? (
              <Typography>
                {details.phoneNumbers[0]}
              </Typography>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">Reservation Email</Typography>
             {details.emails[0] ? (
              <Typography>
                {details.emails[0]}
              </Typography>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h3">Check in</Typography>
             {details?.checkIn?.from ? (
              <Typography>
                From {details?.checkIn?.from}
              </Typography>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3">Check out</Typography>
             {details?.checkOut?.to ? (
              <Typography>
                From {details?.checkOut?.to}
              </Typography>
            ) : (
              <Typography>N/A</Typography>
            )}
          </Grid>                 
          
        </Grid>
      </Container>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { HotelCard } from './HotelCard';
import { useRef } from 'react';
import { useCallback } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
  },
  socialProfile: {
    width: '25%',
  },
  SocialHome: {
    width: '50%',
  },
  SocialDestination: {
    width: '25%',
  },
  gridContainer: {
    flexGrow: 1,
  },
  item: {
    height: 140,
    width: 100,
  },
});

interface ShowRecordsProps {
  query?: { lat: Number; lng: Number };
}

export const ShowRecords = ({ query }: ShowRecordsProps) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState<Array<any>>([]);
  const firstLoad = useRef<boolean>(true);

  const showResults = useCallback((lat?: Number, lng?: Number) => {
    let url = `/.netlify/functions/get-hotels`;

    if (lat && lng) {
      url += `?latitude=${lat}&longitude=${lng}`;
    }

    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setHotelsData(response.data);
        });
    } catch (err) {
      setLoading(false);
      setHotelsData([]);
    }
  }, []);

  useEffect(() => {
    if (firstLoad.current) {
      showResults();
      firstLoad.current = false;
    }

    if (!(query?.lng && query?.lat)) {
      return;
    }

    showResults(query.lat, query.lng);
    setLoading(true);
  }, [query, firstLoad, showResults]);

  if (loading) {
    return (
      <Container>
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (!hotelsData.length) {
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
    <Container>
      <div className={classes.root}>
        <Grid container className={classes.gridContainer} spacing={2}>
          {hotelsData.map((data) => (
            <Grid key={data.hotelId} item xs={12} sm={6} md={4} lg={3}>
              <HotelCard data={data} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

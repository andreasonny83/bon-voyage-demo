import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { HotelCard } from './HotelCard';

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
  const [hotelsData, setHotelsData] = useState<Array<any>>();

  useEffect(() => {
    if (!(query?.lng && query?.lat)) {
      return;
    }

    setLoading(true);

    try {
      fetch(`/.netlify/functions/get-hotels?latitude=${query.lat}&longitude=${query.lng}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setLoading(false);
          setHotelsData(response.data);
        });
    } catch (err) {
      setLoading(false);
      setHotelsData([]);
    }
  }, [query]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!hotelsData) {
    return <Container>No results</Container>;
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

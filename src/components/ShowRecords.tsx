import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { impalaApiKey } from '../config';

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
});

interface ShowRecordsProps {
  query?: string;
}

export const ShowRecords = ({ query }: ShowRecordsProps) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [hotelsData, setHotelsData] = useState<Record<string, string>>();

  useEffect(() => {
    setLoading(true);

    if (!query) {
      return;
    }

    try {
      const response: any = fetch('https://sandbox.impala.travel/v1/hotels?size=25&offset=0&sortBy=createdAt%3Adesc', {
        headers: {
          'x-api-key': `${impalaApiKey}`,
        },
      }).then((response) => response.json());

      console.log(response);
      setLoading(false);
      setHotelsData(response.data);
    } catch (err) {
      setLoading(false);
      setHotelsData({});
    }
  }, [query]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!hotelsData) {
    return <Container>No results found</Container>;
  }

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.socialProfile}>{/* <SocialProfile /> */}</div>
        <div className={classes.SocialHome}>{/* <SocialHome /> */}</div>
        <div className={classes.SocialDestination}>{/* <SocialProfile /> */}</div>
      </div>
    </Container>
  );
};

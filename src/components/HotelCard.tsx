import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 400,
  },
  title: {
    textOverflow: 'ellipsis',
    height: 60,
    overflow: 'hidden',
    display: '-webkit-box',
    wordBreak: 'break-word',
    lineClamp: 2,
    marginBottom: 20,
    '-webkit-box-orient': 'vertical',
  },
  description: {
    textOverflow: 'ellipsis',
    height: 60,
    overflow: 'hidden',
    display: '-webkit-box',
    wordBreak: 'break-word',
    lineClamp: 3,
    '-webkit-box-orient': 'vertical',
  },
  media: {
    height: 180,
  },
});

interface HotelCardProps {
  data: any;
}

export const HotelCard = ({ data }: HotelCardProps) => {
  const classes = useStyles();
  const picture =
    data.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=50';

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={picture} title="Hotel image" />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
            {data.description.short}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

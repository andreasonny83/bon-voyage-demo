import React from 'react';
import { Box, Container, ImageList, ImageListItem, Typography } from '@material-ui/core';
import { RoomType } from '../types';

interface HotelImagesProps {
  name: string;
  roomTypes?: Array<RoomType>;
}

export const HotelImages = (props: HotelImagesProps) => {
  const { name, roomTypes } = props;

  return (
    <Container>
      <Typography variant="h3">Hotel Rooms</Typography>
      <ImageList rowHeight={300} cols={2}>
        {roomTypes?.map((roomType) => (
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
            {name} has {roomTypes?.length} lovely rooms for you to choose from.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            You can check more pictures and details of each room below.
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

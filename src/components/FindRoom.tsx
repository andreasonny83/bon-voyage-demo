import React, { useCallback, useState } from 'react';
import { Button, Container, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles/';
import { formatDate } from '../helpers/format-date';
import { RoomBooking, RoomType } from '../types';

interface FindRoomProps {
  checkIn: Date;
  checkOut: Date;
  hotelId: string;
  roomTypes?: Array<RoomType>;
}

const useStyles = makeStyles((theme) => ({
  itemList: {
    paddingRight: '90px',
  },
  inputField: {
    width: '60px',
  },
}));

export const FindRoom = (props: FindRoomProps) => {
  const { checkIn, checkOut, hotelId, roomTypes } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Array<RoomBooking>>();

  const setBookingData = (data?: Array<RoomType>) => {
    if (data) {
      const bookingData: Array<RoomBooking> = data.map((roomType) => {
        return {
          adults: 0,
          rateId: roomType.roomTypeId,
        };
      });

      setBooking(bookingData);
    }
  };

  const bookRoom = useCallback(() => {
    const start = formatDate(checkIn);
    const end = formatDate(checkOut);

    const url = `/.netlify/functions/book-room?hotelId=${hotelId}&start=${start}&end=${end}`;
    setLoading(true);

    try {
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          if (response.hotelId) {
            setLoading(false);
            setBookingData(response);
            return;
          }

          setLoading(false);
          setBookingData(undefined);
        });
    } catch (err) {
      setLoading(false);
      setBookingData(undefined);
    }
  }, [checkIn, checkOut, hotelId]);

  const handleRoomChange = (roomType: RoomType) => (event: any) => {
    if (!booking?.length) {
      return;
    }

    const newBooking: Array<RoomBooking> = booking.map((room) => {
      if (room.rateId === roomType.roomTypeId) {
        return {
          ...room,
          adults: event.target.value,
        };
      }
      return room;
    });

    setBooking(newBooking);
  };

  if (!roomTypes) {
    return <div>No result</div>;
  }

  console.warn(booking);
  // console.warn(roomTypes);
  console.warn(loading);

  return (
    <Container>
      <List>
        {roomTypes.map((roomType, index) => (
          <ListItem key={roomType.roomTypeId} className={classes.itemList}>
            <ListItemText primary={roomType.name} secondary={roomType.description} />
            <ListItemSecondaryAction>
              <TextField
                type="number"
                variant="outlined"
                className={classes.inputField}
                value={booking?.[index].adults}
                InputProps={{ inputProps: { min: 0, max: roomType.maxOccupancy } }}
                onChange={handleRoomChange(roomType)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button onClick={bookRoom} color="secondary" variant="contained">
        Book Room
      </Button>
    </Container>
  );
};

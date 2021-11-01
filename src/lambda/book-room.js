import axios from 'axios';
require('dotenv').config();

export async function handler(event) {
  const { start, end, rooms } = JSON.parse(event?.body);

  if (!start || !end || !rooms) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'Missing required information',
      }),
    };
  }

  const bookingContact = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@mail.com',
  };

  const url = `https://sandbox.impala.travel/v1/bookings`;

  try {
    const response = await axios({
      method: 'POST',
      url,
      headers: {
        'x-api-key': `${process.env.IMPALA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        start,
        end,
        rooms,
        bookingContact,
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: err?.response?.status || 500,
      body: JSON.stringify({ msg: err?.response?.data || err?.message }),
    };
  }
}

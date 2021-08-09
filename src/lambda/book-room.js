import axios from 'axios';
require('dotenv').config();

export async function handler(event, context) {
  const { queryStringParameters } = event;
  const hotelId = queryStringParameters?.hotelId;
  const start = queryStringParameters?.start;
  const end = queryStringParameters?.end;

  if (!hotelId || !start || !end) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'An Hotel ID, a start and end date must be provided to check the hotel availability',
      }),
    };
  }

  const url = `https://sandbox.impala.travesl/v1/hotels/${hotelId}?start=${start}&end=${end}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': `${process.env.IMPALA_API_KEY}`,
        Accept: 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: err?.response?.status || 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}

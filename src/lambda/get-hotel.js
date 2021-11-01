import axios from 'axios';
require('dotenv').config();

export async function handler(event) {
  const { queryStringParameters } = event;
  const hotelId = queryStringParameters?.hotelId;
  const start = queryStringParameters?.start;
  const end = queryStringParameters?.end;

  if (!hotelId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: 'An Hotel ID must be provided to fetch the hotel details' }),
    };
  }

<<<<<<< HEAD
  const url = `https://api.impala.travel/v1/hotels/${hotelId}`;
=======
  let url = `https://sandbox.impala.travel/v1/hotels/${hotelId}`;
  if (start && end && start !== 'undefined' && end !== 'undefined') {
    url += `?start=${start}&end=${end}`;
  }
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6

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

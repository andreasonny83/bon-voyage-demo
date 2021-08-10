import axios from 'axios';
require('dotenv').config();

export async function handler(event) {
  const { queryStringParameters } = event;
  const latitude = queryStringParameters?.latitude;
  const longitude = queryStringParameters?.longitude;

  let url = `https://sandbox.impala.travel/v1/hotels?size=12&offset=0&sortBy=createdAt%3Adesc`;

  if (latitude && longitude) {
    url += `&latitude=${latitude}&longitude=${longitude}&radius=10000`;
  }

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
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}

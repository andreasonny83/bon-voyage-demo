import axios from 'axios';
require('dotenv').config();

export async function handler(event, context) {
  try {
    const response = await axios.get(
      'https://sandbox.impala.travel/v1/hotels?size=10&offset=0&sortBy=createdAt%3Adesc',
      {
        headers: {
          'x-api-key': `${process.env.IMPALA_API_KEY}`,
          Accept: 'application/json',
        },
      },
    );

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

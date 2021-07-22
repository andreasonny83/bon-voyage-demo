[![Netlify Status](https://api.netlify.com/api/v1/badges/d9211697-9d58-441e-beae-c5b7a724c1d6/deploy-status)](https://app.netlify.com/sites/thebonvoyage/deploys)

# Bom Voyage Demo

## Environment Variables

This project requires a Google Maps API key and an Impala API key.
These can be stored inside your local environment variables or using a `.env` file. (Just rename .env.sample to .env
and replace the keys)

The 2 variable are:

`IMPALA_API_KEY`: Your Impala key
`REACT_APP_GOOGLE_MAPS_KEY`: Your Google Maps key

## Local Development

This project contains a front-end application and some Netlify functions used for fetching the Impala information.

Run the front-end application with

```sh
$ yarn start
```

And the Lambda functions, inside a different terminal instance, with

```sh
$ yarn start:lambda
```

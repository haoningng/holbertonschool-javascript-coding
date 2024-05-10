#!/usr/bin/node
const request = require('request');

request.get(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    console.log('code: ', response.statusCode);
  }
});

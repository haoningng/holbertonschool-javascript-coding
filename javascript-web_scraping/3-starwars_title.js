#!/usr/bin/node
const request = require('request');

request.get(`https://swapi-api.hbtn.io/api/films/${process.argv[2]}`, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('code:', response.statusCode);
  } else {
    try {
      console.log(JSON.parse(body).title);
    } catch (err) {
      console.log(err);
    }
  }
});

#!/usr/bin/node
const request = require('request');

request.get(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('code:', response.statusCode);
  } else {
    try {
      const array = JSON.parse(body).results;
      const newList = [];
      for (const each of array) {
        if (each.characters.includes('https://swapi-api.hbtn.io/api/people/18/')) {
          newList.push(each);
        }
      }
      console.log(newList.length);
    } catch (err) {
      console.log(err);
    }
  }
});

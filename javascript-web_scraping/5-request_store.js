#!/usr/bin/node
const request = require('request');
const fs = require('fs');

request.get(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('code:', response.statusCode);
  } else {
    try {
      fs.writeFile(process.argv[3], body, 'utf8', (error) => {
        if (error) {
          console.error(error);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

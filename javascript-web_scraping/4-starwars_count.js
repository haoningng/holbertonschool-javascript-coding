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
        for (const charUrl of each.characters) {
          const splitted = charUrl.split('/');
          const last = splitted[splitted.length - 2]
          if (last === '18') {
            newList.push(each);
            break;
          }
        }
      }
      console.log(newList.length);
    } catch (err) {
      console.log(err);
    }
  }
});
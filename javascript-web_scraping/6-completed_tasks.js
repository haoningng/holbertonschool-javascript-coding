#!/usr/bin/node
const request = require('request');

request.get(process.argv[2], (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('code:', response.statusCode);
  } else {
    try {
      const result = {};
      const data = JSON.parse(body);
      for (const each of data) {
        if (each.completed) {
          result[each.userId] = result[each.userId] ? result[each.userId] + 1 : 1;
        }
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
});

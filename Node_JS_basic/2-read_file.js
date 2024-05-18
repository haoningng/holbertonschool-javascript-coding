const fs = require('fs');

function countStudents(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      throw new Error('Cannot load the database');
    } else {
      const lines = data.trim().split('\n');
      // Remove the first row of the csv file
      lines.shift();
      const numLines = lines.length;
      process.stdout.write(`Number of students: ${numLines}\n`);

      const dict = {};
      for (const each of lines) {
        const line = each.split(',');
        const key = line[3];
        const value = line[0];
        // if the key doesn't exist in the dict, initialise it with empty array
        if (!dict[key]) {
          dict[key] = [];
        }
        dict[key].push(value);
      }
      for (const key in dict) {
        if (Object.prototype.hasOwnProperty.call(dict, key)) {
          // add a space in front of each name except the first one
          const newValue = dict[key].map((name) => (dict[key].indexOf(name) === 0 ? name : ` ${name}`));
          process.stdout.write(`Number of students in ${key}: ${dict[key].length}. List: ${newValue}\n`);
        }
      }
    }
  });
}

module.exports = countStudents;

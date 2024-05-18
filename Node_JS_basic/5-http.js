const { createServer } = require('http');
const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    // Remove the first row of the csv file
    lines.shift();
    const numLines = lines.length;
    let result = `Number of students: ${numLines}`;

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
        result += `\nNumber of students in ${key}: ${dict[key].length}. List: ${newValue}`;
      }
    }
    return result;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const app = createServer(async (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students') {
    const data = await countStudents(process.argv[2]);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`This is the list of our students\n${data}`);
    res.end();
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;

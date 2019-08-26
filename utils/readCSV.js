const csv = require('csv-parser');
const fs = require('fs');

const readData = (pathToCSV) => new Promise((resolve, reject) => {
  const seedData = [];
  const readable = fs.createReadStream(pathToCSV);
  readable.on('error', (err) => reject(err));
  readable.pipe(csv())
    .on('data', (row) => seedData.push(row))
    .on('end', () => resolve(seedData));
});

module.exports = readData;

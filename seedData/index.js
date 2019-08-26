const path = require('path');
const readData = require('../utils/readCSV');
const normaliseData = require('../utils/normaliseData');

const seed = async () => normaliseData(await readData(path.resolve(__dirname, './recipe-data.csv')));

module.exports = seed;

const express = require('express');
const logger = require('morgan');

const recipesRouter = require('./routes/recipes');

require('dotenv').config();

const app = express();

app.disable('x-powered-by'); // security best prictice
app.disable('etag'); // no-chache at this layer

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/recipes', recipesRouter);

module.exports = app;

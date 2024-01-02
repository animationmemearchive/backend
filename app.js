const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { startSequelizing } = require('./lib/sequelize')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/videos', require('./routes/videos'));
app.use('/creators', require('./routes/creators'));
app.use('/upload', require('./routes/upload'));


startSequelizing();

module.exports = app;

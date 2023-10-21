let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let dotenv = require('dotenv');

dotenv.config();

let indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const mediaRouter = require('./routes/media');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/media', mediaRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


const fs = require('fs');

// Create a directory to store video files and JSON data
const databaseDirectory = process.env.VIDEODIR;
if (!fs.existsSync(databaseDirectory)) {
  fs.mkdirSync(databaseDirectory);
}

// Function to list video files in a directory
function listVideoFiles(directory) {
  const files = fs.readdirSync(directory);
  return files.filter((file) => {
    const fileExtension = path.extname(file).toLowerCase();
    return ['.mp4', '.avi', '.mkv', '.mov'].includes(fileExtension);
  });
}

// Function to create a JSON file for each video file
function createVideoDatabase(videoFiles) {
  videoFiles.forEach((videoFile) => {
    const videoData = {
      filename: videoFile,
      title: '',
      duration: '',
      resolution: '',
      dateAdded: new Date().toLocaleString(),
    };
    
    const jsonFileName = `${path.basename(videoFile, path.extname(videoFile))}.json`;
    const jsonFilePath = path.join(databaseDirectory, jsonFileName);

    fs.writeFileSync(jsonFilePath, JSON.stringify(videoData, null, 2), 'utf8');
  });
}

// List video files in a directory
const videoFiles = listVideoFiles(process.env.VIDEODIR);

// Create a JSON file for each video file with initial data
createVideoDatabase(videoFiles);

console.log('File-based video database created.');
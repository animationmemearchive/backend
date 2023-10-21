const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the folder path
const mediaFolder = process.env.VIDEODIR;
const fileExtensions = ['.mp4'];

// Define the route to get the list of media files
router.get('/media', (req, res) => {
    // Read the media folder
    fs.readdir(mediaFolder, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }

        // Filter the files to only include media files
        const mediaFiles = files.filter(file => {
            const extension = path.extname(file).toLowerCase();
            return fileExtensions.includes(extension);
        });

        // Map the media files to include the title and full path
        const mediaList = mediaFiles.map(file => {
            const title = path.parse(file).base;
            const fullPath = `${process.env.HOST}/${path.join('media', file)}`;
            return { title, fullPath };
        });

        // Send the list of media files as JSON
        res.json(mediaList);
    });
});

// Define the route to get the data from a media file's companion JSON file
router.get('/media/:filename', (req, res) => {
  const filename = req.params.filename;
  const jsonFilename = path.join(mediaFolder, `${filename}.json`);

  // Check if the JSON file exists
  fs.access(jsonFilename, fs.constants.F_OK, err => {
    if (err) {
      console.error(err);
      res.status(404).send('JSON file not found');
      return;
    }

    // Read the JSON file
    fs.readFile(jsonFilename, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      // Parse the JSON data and send it
      const jsonData = JSON.parse(data);
      res.send(jsonData);
    });
  });
});

module.exports = router;
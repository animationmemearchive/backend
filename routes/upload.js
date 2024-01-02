const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Video } = require('../lib/sequelize');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded videos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded video
    }
});


const upload = multer({ storage: storage });

router.post('/', upload.single('video'), function (req, res, next) {
    // Access the uploaded video file using req.file
    const video = req.file;

    // Get the date of the file
    const dateCreated = fs.statSync(video.path).birthtime;

    // Create a new video object in the database using the video model
    Video.create({
        title: video.originalname,
        dateCreated: dateCreated,
        videoURL: process.env.BASE_URL + '/uploads/' + video.originalname,
        CreatorId: 1
    }).then(video => {
        // Send a response indicating the video was created successfully
        res.status(201).json(video);
    });
});

module.exports = router;
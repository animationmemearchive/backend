const express = require('express');

const router = express.Router();

// Define the folder path
const mediaFolder = process.env.VIDEODIR;

// Serve all items in the "public" folder
router.use(express.static(mediaFolder));

module.exports = router;

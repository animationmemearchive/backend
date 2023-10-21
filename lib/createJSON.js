const fs = require('fs');
const path = require('path');

function createJSON(videoFiles, databaseDirectory) {
    videoFiles.forEach((videoFile) => {
        const jsonFileExists = fs.existsSync(`${path.basename(videoFile)}.json`);
        if (jsonFileExists) {
            return;
        }
        const videoData = {
            title: "",
            dateCreated: null,
            dateAdded: new Date().toLocaleString(),
            description: "",
            author: "",
            resolution: {
                width: null,
                height: null
            },
            framerate: null,
        }

        const jsonFileName = `${path.basename(videoFile)}.json`;
        const jsonFilePath = path.join(databaseDirectory, jsonFileName);

        fs.writeFileSync(jsonFilePath, JSON.stringify(videoData, null, 2), 'utf8');
    });
}

module.exports = { createJSON };
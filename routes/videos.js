const express = require('express');
const router = express.Router();
const { Creator, Video } = require('../lib/sequelize');
/* GET video list */
router.get('/creator/:creator', function (req, res, next) {

  Creator.findOne({
    where: {
      id: req.params.creator
    }
  }).then(creator => {
    Video.findAll({
      where: {
        CreatorId: creator.id
      }
    }).then(videos => {
      res.json(videos);
    });
  });
});

router.get('/video/:video', function (req, res, next) {
  res.send('TODO - respond with details of provided video');
});

module.exports = router;

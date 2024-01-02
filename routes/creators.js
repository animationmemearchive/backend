const express = require('express');
const router = express.Router();
const { Creator } = require('../lib/sequelize');

/* GET creator list */
router.get('/', function (req, res, next) {
    Creator.findAll().then(creators => {
        res.json(creators);
    });
});

router.get('/new/:name', function (req, res, next) {
    Creator.create({ username: req.params.name }).then(creator => {
        res.json(creator);
    });
});

module.exports = router;
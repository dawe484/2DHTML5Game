'use strict';

let express = require('express');
let router = express.Router();

// Videos
router.get('/', (req, res) =>
  res.render('videos', { title: 'Magical Heroes'})
);

module.exports = router;

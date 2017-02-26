'use strict';

const express = require('express');
const router = express.Router();

// Videos
router.get('/', (req, res) =>
  res.render('videos', { title: 'Magical Heroes'})
);

module.exports = router;

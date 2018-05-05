'use strict';

const express = require('express');
const router = express.Router();

// Heroes Collection
router.get('/', (req, res) =>
  res.render('screenshots', {
    title: 'Magical Heroes'
  })
);

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();

// Heroes Collection
router.get('/', (req, res) =>
  res.render('feedback', {
    title: 'Magical Heroes'
  })
);

module.exports = router;
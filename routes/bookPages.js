'use strict';

const express = require('express');
const router = express.Router();

// Heroes Collection
router.get('/', (req, res) =>
  res.render('bookPages', { title: 'Magical Heroes'})
);

module.exports = router;

'use strict';

let express = require('express');
let router = express.Router();

// Heroes Collection
router.get('/', (req, res) =>
  res.render('support', { title: 'Magical Heroes'})
);

module.exports = router;

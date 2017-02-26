'use strict';

const express = require('express');
const router = express.Router();
const Sticker = require('../models/sticker');

// Stickers Collection
router.get('/', (req, res) => {
  Sticker.find( (err, stickers) => {
    let stickersChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < stickers.length; i += chunkSize) {
      stickersChunk.push(stickers.slice(i, i + chunkSize));
    }
    res.render('stickers', { title: 'Magical Heroes', stickers: stickersChunk });
  });
});

module.exports = router;

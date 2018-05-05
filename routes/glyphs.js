'use strict';

const express = require('express');
const router = express.Router();
const Glyph = require('../models/glyph');

// Glyphs Collection
router.get('/', (req, res) => {
  Glyph.find((err, glyphs) => {
    let glyphsChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < glyphs.length; i += chunkSize) {
      glyphsChunk.push(glyphs.slice(i, i + chunkSize));
    }
    res.render('glyphs', {
      title: 'Magical Heroes',
      glyphs: glyphsChunk
    });
  });
});

module.exports = router;
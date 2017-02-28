'use strict';

const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');

// Heroes Collection
router.get('/', (req, res) => {
  Hero.find( (err, heroes) => {
    let heroesChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < heroes.length; i += chunkSize) {
      heroesChunk.push(heroes.slice(i, i + chunkSize));
    }
    res.render('heroes', { title: 'Magical Heroes', heroes: heroesChunk });
  });
});

router.get('/:name', (req, res) => {
  res.render('hero', { title: 'Magical Heroes', outputName: req.params.name });
});

// router.post('/submit', (req, res) => {
//   let name = req.body.name;
//   res.redirect('/heroes/' + name);
// });

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Play Game
// router.get('/', isLoggedIn, (req, res) => {
//   res.render('play', { layout: false, title: 'Magical Heroes' });
// });

router.get('/:userUrlName', isLoggedIn, (req, res) => {
  User.getUserByUsername(req.params.userUrlName, (err, user) => {
    if (err) throw err;
    res.render('play', { layout: false, title: 'Magical Heroes', userUrlName: req.params.userUrlName });
  });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

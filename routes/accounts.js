var express = require('express');
var router = express.Router();

// Sign Up
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Log In
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;

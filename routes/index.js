'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const csrf = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

let User = require('../models/user');

// Get Homepage
router.get('/', (req, res) =>
  res.render('index', { title: 'Magical Heroes', csrfToken: req.csrfToken() })
);

// Serialize
passport.serializeUser((user, done) =>
  done(null, user.id)
);

// Deserialize
passport.deserializeUser((id, done) =>
  User.getUserById(id, (err, user) => done(err, user))
);

// Local Strategy for Login to Local Database
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false, {message: 'Unknown User'});

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
}));

// Login User
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }), (req, res) => res.redirect('/')
);

module.exports = router;

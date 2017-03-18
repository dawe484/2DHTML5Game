'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const csrf = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

const User = require('../models/user');
const Hero = require('../models/hero');
const Avatar = require('../models/avatar');

router.get('/profile', isLoggedIn, (req, res) => {
  Hero.find( (err, heroes) => {
    let heroesChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < heroes.length; i += chunkSize) {
      heroesChunk.push(heroes.slice(i, i + chunkSize));
    }
    res.render('profile', { title: 'Magical Heroes', csrfToken: req.csrfToken(), heroes: heroesChunk })
  });
});

// Logout User
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

// router.use('/', notLoggedIn, function(req, res) {
// });

// Sign Up
router.get('/signup', (req, res) =>
  res.render('signup', { title: 'Magical Heroes', csrfToken: req.csrfToken() })
);

// Log In
router.get('/login', (req, res) =>
  res.render('login', { title: 'Magical Heroes', csrfToken: req.csrfToken() })
);

// Serialize
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize
passport.deserializeUser((id, done) =>
  User.getUserById(id, (err, user) => done(err, user))
);

// Sign Up User
router.post('/signup', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;
  let email = req.body.email;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();

  let errors = req.validationErrors();

  if (errors) {
    res.render('signup', { title: 'Magical Heroes', csrfToken: req.csrfToken(),
      errors:errors
    });
  } else {
    User.findOne({'username': username}, (err, user) => {
      if (err) throw err;
      if (user) {
        //return done(null, false, {message: 'Username is already in use.'});
        req.flash('error_msg', 'Username is already in use.');
        res.redirect('/users/signup');
      } else {
        let now = new Date();
        let newUser = new User({
          urlName: username,
          username: username,
          password: password,
          email: email,
          signup_time: now,
          offset: now.getTimezoneOffset(),
          local_signup_time: now.toLocaleString(),
          avatar: [],
          heroes: []
        });

        User.createUser(newUser, (err, user) => {
          if (err) throw err;
          console.log(user);
          //console.log(username);
          //console.log(Hero.find());
          User.findOne({username: username}, (err, doc) => {
            Hero.find( (err, heroes) => {
              for (let i = 0; i < heroes.length; i++) {
                doc.heroes = heroes;
                doc.save();
              }
            });
            Avatar.find( (err, avatar) => {
              doc.avatar = avatar;
              doc.save();
            });
          });
        });

        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
      }
    });
  }
});

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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

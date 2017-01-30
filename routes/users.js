'use strict'

let express = require('express');
let router = express.Router();
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

// let mongojs = require('mongojs');
// let bcrypt = require('bcryptjs');
//
// let db = mongojs('localhost:27017/2DHTML5Game', ['users']);

let User = require('../models/user');

// Sign Up
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Log In
router.get('/login', (req, res) => {
  res.render('login');
});

// Sign Up User
router.post('/signup', (req, res) => {
  // let firstName = req.body.firstName;
  // let lastName = req.body.lastName;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;
  let email = req.body.email;

  // Validation
  // req.checkBody('firstName', 'First Name is required').notEmpty();
  // req.checkBody('lastName', 'Last Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();

  let errors = req.validationErrors();

  if (errors) {
    res.render('signup', {
      errors:errors
    });
  } else {
    let newUser = new User({
      // firstName: firstName,
      // lastName: lastName,
      username: username,
      password: password,
      email: email
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

// Local Strategy for Login to Local Database
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });

    });
  }
));

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Login User
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }), (req, res) => {
    res.redirect('/');
  }
);

// Logout User
router.get('/logout', (req, res) => {
  req.logout();

  req.flash('success_msg', 'You are logged out');

  res.redirect('/users/login');
});

module.exports = router;
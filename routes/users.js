'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const csrf = require('csurf');
// const request = require('request');
const Recaptcha = require('express-recaptcha');

const csrfProtection = csrf();
router.use(csrfProtection);

const User = require('../models/user');
const Hero = require('../models/hero');
const Avatar = require('../models/avatar');
// const Language = require('../models/language');

let userLoggedUsername;

const siteKey = '6LfC_08UAAAAAJ4FFxGy6cVUnbeKiziF4ERgMEVE';
const secretKey = '6LfC_08UAAAAALp4DQLLOXmdOBwr3813hnE95cfi';

const recaptcha = new Recaptcha(siteKey, secretKey);

router.get('/profile', isLoggedIn, (req, res) => {
  Hero.find((err, heroes) => {
    let heroesChunk = [];
    let chunkSize = 6;
    for (let i = 0; i < heroes.length; i += chunkSize) {
      heroesChunk.push(heroes.slice(i, i + chunkSize));
    }
    res.render('profile', {
      title: 'Magical Heroes',
      csrfToken: req.csrfToken(),
      heroes: heroesChunk
    });
  });
});

// Logout User
router.get('/logout', isLoggedIn, (req, res) => {
  User.findOne({
    username: userLoggedUsername
  }, (err, user) => {
    user.status = 'logout';
    user.save();
  });
  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

// router.use('/', notLoggedIn, function(req, res) {
// });

// Sign Up
router.get('/signup', (req, res) =>
  res.render('signup', {
    title: 'Magical Heroes',
    csrfToken: req.csrfToken()
  })
);

// Log In
router.get('/login', (req, res) =>
  res.render('login', {
    title: 'Magical Heroes',
    csrfToken: req.csrfToken()
  })
);

// Serialize
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize
passport.deserializeUser((id, done) =>
  User.getUserById(id, (err, user) => done(err, user))
);

// Sign Up User
router.post('/signup', recaptcha.middleware.verify, (req, res) => {
  // const captcha = req.body['g-recaptcha-response'];

  // if (captcha === undefined || captcha === '' || captcha === null) {
  //   return res.json({
  //     "success": false,
  //     "msg": "Please select captcha."
  //   });
  // }
  //
  if (!req.recaptcha.error) {
    const username = req.body.username;
    const password = req.body.password;
    // const password2 = req.body.password2;
    const email = req.body.email;
    // const captcha = req.body['g-recaptcha-response'];

    // Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

    const errors = req.validationErrors();

    if (errors) {
      res.render('signup', {
        title: 'Magical Heroes',
        csrfToken: req.csrfToken(),
        errors: errors
      });
    } else {
      User.findOne({
        'username': username
      }, (err, user) => {
        if (err) throw err;
        if (user) {
          //return done(null, false, {message: 'Username is already in use.'});
          req.flash('error_msg', 'Username is already in use.');
          res.redirect('/users/signup');
        } else {
          const now = new Date();
          const newUser = new User({
            urlName: username,
            username: username,
            password: password,
            email: email,
            signup_time: now,
            offset: now.getTimezoneOffset(),
            local_signup_time: now.toLocaleString(),
            language: 'english',
            status: 'logout',
            avatar: [],
            heroes: []
          });

          User.createUser(newUser, (err, user) => {
            if (err) throw err;
            // eslint-disable-next-line no-console
            console.log(user);
            //console.log(username);
            //console.log(Hero.find());
            User.findOne({
              username: username
            }, (err, doc) => {
              // Hero.find((err, heroes) => {
              //   for (let i = 0; i < heroes.length; i++) {
              //     doc.heroes = heroes;
              //     doc.save();
              //   }
              // });
              Avatar.find((err, avatar) => {
                // eslint-disable-next-line no-console
                // console.log(avatar);
                doc.avatar = avatar;
                // doc.save();
                Hero.find((err, heroes) => {
                  for (let i = 0; i < heroes.length; i++) {
                    doc.heroes = heroes;
                    doc.save();
                  }
                });
              });
            });
          });

          req.flash('success_msg', 'You are registered and can now login');
          res.redirect('/users/login');
        }
      });
    }
  } else {
    req.flash('error_msg', 'Please select captcha');
    res.redirect('/users/signup');
  }

});

// Local Strategy for Login to Local Database
passport.use(new LocalStrategy((username, password, done) => {
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false, {
      message: 'Unknown User'
    });

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
    });

    if (user) {
      userLoggedUsername = user.username;
      user.status = 'login';
      user.save();
    }
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

// function notLoggedIn(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/');
// }
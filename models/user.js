'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const Hero = require('../models/hero');
const Avatar = require('../models/avatar');

// User Schema
const UserSchema = mongoose.Schema({
  urlName: {
    type: String,
    lowercase: true
  },
  username: {
    type: String,
    // index: true,
    // unique: true,
    // set: toLower
  },
  password: {
    type: String
  },
  email: {
    type: String,
  },
  signup_time: {
    type: Date
  },
  offset: {
    type: Number
  },
  local_signup_time: {
    type: String
  },
  status: {
    type: String
  },
  avatar: [ Avatar.schema ],
  heroes: [ Hero.schema ]
  // heroes: [{
  //   type: Schema.ObjectId,
  //   ref: 'Hero'
  // }]
},
  {versionKey: '_documentVersion'}
);

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      // Store hash in your password DB.
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = (username, callback) => {
  let query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

// function toLower(str) {
//   return str.toLowerCase();
// }

'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

// User Schema
let UserSchema = mongoose.Schema({
  // firstName: {
  //   type: String
  // },
  // lastName: {
  //   type: String
  // },
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
    // unique: true,
    // set: toLower
  },
  signup_time: {
    type: Date, default: Date.now
  }
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

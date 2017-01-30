'use strict'

// let mongodb = require('mongodb');
// let mongojs = require('mongojs');
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

// mongojs will use existing connection of that instance instead of creating a new one
//let db = mongojs('localhost:27017/2DHTML5Game', ['account']);
// mongodb.Db.connect('mongodb://localhost:27017/2DHTML5Game', (err, theDb) => {
//   let db = mongojs(theDb, ['users']); // specified all collections in db !!
// })

// User Schema
let UserSchema = mongoose.Schema({
  // firstName: {
  //   type: String
  // },
  // lastName: {
  //   type: String
  // },
  username: {
    type: String
    // index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
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

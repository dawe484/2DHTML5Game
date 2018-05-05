'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tutorial Schema
const TutorialSchema = new Schema({
  speaker: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  versionKey: '_documentVersion'
});

//
// let Tutorial = 
module.exports = mongoose.model('Tutorial', TutorialSchema);
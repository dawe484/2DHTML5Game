'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// GoldPlusByLevelSchema Schema
const GoldPlusByLevelSchema = new Schema({
  avatar_curr_lvl: {
    type: Number,
    required: true
  },
  gold_plus: {
    type: Number,
    required: true
  },
  price_in_diamond: {
    type: Number,
    default: 50
  }
}, {
  versionKey: '_documentVersion'
});

// let GoldPlusByLevel =
module.exports = mongoose.model('GoldPlusByLevel', GoldPlusByLevelSchema);